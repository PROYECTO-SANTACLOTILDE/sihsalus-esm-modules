import { Tile } from '@carbon/react';
import { launchWorkspace, useConfig, usePatient } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ConfigObject } from '../../../config-schema';
import styles from './cred-schedule.scss';

interface CredAgeGroupsProps {
  patientUuid: string;
}

const CredAgeGroups: React.FC<CredAgeGroupsProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { ageGroupsCRED } = useConfig<ConfigObject>();
  const { patient, isLoading, error } = usePatient(patientUuid);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<(typeof ageGroupsCRED)[0] | null>(null);

  const patientAge = useMemo(() => {
    if (!patient?.birthDate) return { inDays: 0, inMonths: 0 };

    const birthDate = dayjs(patient.birthDate);
    const today = dayjs();

    const inDays = today.diff(birthDate, 'days');
    const inMonths = today.diff(birthDate, 'months');

    return { inDays, inMonths };
  }, [patient]);

  const currentAgeGroup = useMemo(() => {
    return ageGroupsCRED.find((group) => {
      const inDayRange =
        group.minDays !== undefined &&
        group.maxDays !== undefined &&
        patientAge.inDays >= group.minDays &&
        patientAge.inDays <= group.maxDays;

      const inMonthRange =
        group.minMonths !== undefined &&
        group.maxMonths !== undefined &&
        patientAge.inMonths >= group.minMonths &&
        patientAge.inMonths <= group.maxMonths;

      return inDayRange || inMonthRange;
    });
  }, [patientAge, ageGroupsCRED]);

  const handleAgeGroupClick = (group) => {
    setSelectedAgeGroup(group);
    launchWorkspace('wellchild-control-form', {
      workspaceTitle: `${t('ageGroupDetails', 'Control CRED - Grupo Etario')} - ${group.label}`,
      additionalProps: {
        patientUuid,
        ageGroup: group,
        type: 'ageGroup',
      },
    });
  };

  if (isLoading) return <div>{t('loadingPatient', 'Cargando paciente...')}</div>;
  if (error)
    return <p className={styles.error}>{t('errorLoadingPatient', 'Error cargando los datos del paciente.')}</p>;

  return (
    <div className={styles.widgetCard}>
      <div className={styles.desktopHeading}>
        <h4>{t('credAgeGroups', 'Control Según Edad')}</h4>
      </div>
      <div className={styles.ageGroups}>
        {ageGroupsCRED.map((group) => (
          <Tile
            key={group.label}
            className={`${styles.ageTile} ${selectedAgeGroup?.label === group.label ? styles.active : ''} ${
              currentAgeGroup?.label === group.label ? styles.current : ''
            }`}
            onClick={() => handleAgeGroupClick(group)}
          >
            <strong>{group.label}</strong>
            {group.sublabel && <div>{group.sublabel}</div>}
          </Tile>
        ))}
      </div>
    </div>
  );
};

export default CredAgeGroups;
