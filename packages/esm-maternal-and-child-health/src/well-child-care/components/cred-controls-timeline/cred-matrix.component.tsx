import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  DataTableSkeleton,
} from '@carbon/react';
import { CardHeader, ErrorState } from '@openmrs/esm-patient-common-lib';
import { useConfig } from '@openmrs/esm-framework';
import { useCREDSchedule, type CREDControlWithStatus } from '../../../hooks/useCREDSchedule';
import styles from './cred-matrix.scss';
import CredTile from './cred-tile';
import type { ConfigObject } from '../../../config-schema';

interface CredControlsMatrixProps {
  patientUuid: string;
}

const CredControlsMatrix: React.FC<CredControlsMatrixProps> = ({ patientUuid }) => {
  const { ageGroupsCRED } = useConfig<ConfigObject>();
  const { controls, completedCount, totalCount, overdueControls, isLoading, error } = useCREDSchedule(patientUuid);
  const { t } = useTranslation();

  const headerTitle = t('controlsAndAtentions', 'Atenciones y Controles');

  // Group controls by ageGroupLabel to match the column headers
  const groupedControls = useMemo(() => {
    const grouped: Record<string, CREDControlWithStatus[]> = {};

    ageGroupsCRED.forEach((group) => {
      grouped[group.label] = [];
    });

    controls.forEach((control) => {
      if (grouped[control.ageGroupLabel]) {
        grouped[control.ageGroupLabel].push(control);
      }
    });

    return grouped;
  }, [controls, ageGroupsCRED]);

  if (isLoading) return <DataTableSkeleton role="progressbar" compact zebra />;
  if (error) return <ErrorState error={error} headerTitle={headerTitle} />;

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <div className={styles.clinicalDataHeaderActionItems}>
          <span className={styles.summaryItem}>
            {t('completedOf', '{{completed}} de {{total}} controles', {
              completed: completedCount,
              total: totalCount,
            })}
          </span>
          {overdueControls.length > 0 && (
            <span className={styles.overdueCount}>
              {t('overdueCount', '{{count}} vencidos', { count: overdueControls.length })}
            </span>
          )}
        </div>
      </CardHeader>
      <div className={styles.matrixScroll}>
        <Table size="sm" useZebraStyles>
          <TableHead>
            <TableRow>
              {ageGroupsCRED.map((group) => (
                <TableHeader key={group.label}>
                  {group.label}
                  {group.sublabel && <div className={styles.sublabel}>{group.sublabel}</div>}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {ageGroupsCRED.map((group) => (
                <TableCell key={group.label} className={styles.cellContent}>
                  {(groupedControls[group.label] ?? []).map((control) => (
                    <CredTile
                      key={control.controlNumber}
                      uuid={control.encounterUuid}
                      controlNumber={control.controlNumber}
                      label={control.label}
                      date={control.encounterDate ?? control.appointmentDate ?? control.targetDate}
                      status={control.status}
                    />
                  ))}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CredControlsMatrix;
