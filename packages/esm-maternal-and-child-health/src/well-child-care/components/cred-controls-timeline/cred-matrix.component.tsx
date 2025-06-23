import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  DataTableSkeleton,
} from '@carbon/react';
import { CardHeader, ErrorState } from '@openmrs/esm-patient-common-lib';
import { Add } from '@carbon/react/icons';
import { useConfig, useLayoutType, launchWorkspace } from '@openmrs/esm-framework';
import useEncountersCRED from '../../../hooks/useEncountersCRED';
import styles from './cred-matrix.scss';
import CredTile from './cred-tile';
import type { ConfigObject } from '../../../config-schema';

interface CredEntry {
  id: string;
  number: number;
  date: string; // ISO date
  type: 'complementary' | 'regular';
  createdByCurrentUser: boolean;
}

interface CredControlsMatrixProps {
  patientUuid: string;
  onDelete: (id: string) => void;
}

const CredControlsMatrix: React.FC<CredControlsMatrixProps> = ({ patientUuid, onDelete }) => {
  const { ageGroupsCRED } = useConfig<ConfigObject>();
  const { encounters, isLoading, error } = useEncountersCRED(patientUuid);
  const { t } = useTranslation();

  const headerTitle = `${t('controlsAndAtentions', 'Atenciones y Controles')}`;

  const entries: CredEntry[] = useMemo(() => {
    return (encounters || []).map((encounter) => {
      const obs = encounter.obs || [];
      const numberObs = obs.find((o) => o.concept?.display?.includes('Número de control'));
      const typeObs = obs.find((o) => o.concept?.display?.includes('complementario'));

      return {
        id: encounter.uuid,
        number: parseInt(String(numberObs?.value ?? '0'), 10),
        date: encounter.encounterDatetime,
        type: typeObs?.value === true ? 'complementary' : 'regular',
        createdByCurrentUser: encounter?.creator?.uuid === encounter?.provider?.uuid,
      };
    });
  }, [encounters]);

  const launchForm = (group) => {
    launchWorkspace('wellchild-control-form', {
      workspaceTitle: `${t('ageGroupDetails', 'Detalles del grupo de edad')} - ${group.label}`,
      additionalProps: {
        patientUuid,
        ageGroup: group,
        type: 'ageGroup',
      },
    });
  };

  const getAgeInDays = (date: string) => dayjs().diff(dayjs(date), 'days');
  const getAgeInMonths = (date: string) => dayjs().diff(dayjs(date), 'months');

  const getGroupForEntry = (entry: CredEntry) => {
    const ageInDays = getAgeInDays(entry.date);
    const ageInMonths = getAgeInMonths(entry.date);

    return ageGroupsCRED.find((group) => {
      const inDayRange =
        group.minDays !== undefined &&
        group.maxDays !== undefined &&
        ageInDays >= group.minDays &&
        ageInDays <= group.maxDays;

      const inMonthRange =
        group.minMonths !== undefined &&
        group.maxMonths !== undefined &&
        ageInMonths >= group.minMonths &&
        ageInMonths <= group.maxMonths;

      return inDayRange || inMonthRange;
    });
  };

  const groupedEntries: Record<string, CredEntry[]> = {};

  ageGroupsCRED.forEach((group) => {
    const key = group.label + (group.sublabel || '');
    groupedEntries[key] = [];
  });

  entries.forEach((entry) => {
    const group = getGroupForEntry(entry);
    if (group) {
      const key = group.label + (group.sublabel || '');
      groupedEntries[key]?.push(entry);
    }
  });

  if (isLoading) return <DataTableSkeleton role="progressbar" compact zebra />;
  if (error) return <ErrorState error={error} headerTitle={headerTitle} />;

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <div className={styles.clinicalDataHeaderActionItems}>
          <Button kind="ghost" renderIcon={Add} iconDescription={t('addData', 'Add data')} onClick={launchForm}>
            {t('add', 'Add')}
          </Button>
        </div>
      </CardHeader>
      <Table size="sm" useZebraStyles>
        <TableHead>
          <TableRow>
            {ageGroupsCRED.map((group) => (
              <TableHeader key={group.label + (group.sublabel || '')}>
                {group.label}
                {group.sublabel && <div className={styles.sublabel}>{group.sublabel}</div>}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {ageGroupsCRED.map((group) => {
              const key = group.label + (group.sublabel || '');
              return (
                <TableCell key={key} className={styles.cellContent}>
                  {groupedEntries[key].map((entry) => (
                    <CredTile
                      key={entry.id}
                      uuid={entry.id}
                      number={entry.number}
                      date={entry.date}
                      createdByCurrentUser={entry.createdByCurrentUser}
                      onDelete={onDelete}
                    />
                  ))}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CredControlsMatrix;
