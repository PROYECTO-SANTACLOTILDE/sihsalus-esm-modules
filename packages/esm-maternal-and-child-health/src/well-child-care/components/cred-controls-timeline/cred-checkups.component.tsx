import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, InlineLoading, Tag } from '@carbon/react';
import { AddIcon, launchWorkspace, formatDate } from '@openmrs/esm-framework';
import styles from './cred-schedule.scss';
import useEncountersCRED from '../../../hooks/useEncountersCRED';
import useAppointmentsCRED from '../../../hooks/useAppointmentsCRED';

interface CredCheckupsProps {
  patientUuid: string;
}

const CredCheckups: React.FC<CredCheckupsProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const { encounters, isLoading: isLoadingEncounters } = useEncountersCRED(patientUuid);
  const { appointments: credAppointments, isLoading: isLoadingAppointments } = useAppointmentsCRED(patientUuid);

  const handleAddCredControl = (checkup: any) => {
    launchWorkspace('wellchild-control-form', {
      workspaceTitle: `${t('newCredEncounter', 'Nuevo Control CRED')} - ${checkup.serviceName || checkup.service?.name || ''}`,
      additionalProps: {
        patientUuid,
        checkup,
        type: 'newControl',
      },
    });
  };

  return (
    <div className={styles.widgetCard}>
      <div className={styles.desktopHeading}>
        <h4>{t('credCheckups', 'Controles CRED')}</h4>
      </div>
      <div className={styles.checkups}>
        {isLoadingEncounters ? (
          <InlineLoading description={t('loadingEncounters', 'Cargando encuentros...')} />
        ) : (
          encounters.map((encounter) => (
            <div key={encounter.id} className={styles.checkupItem}>
              <span>{encounter.title}</span>
              <span>{encounter.date}</span>
              <Tag type={encounter.type === 'CRED' ? 'green' : 'purple'}>{encounter.type}</Tag>
            </div>
          ))
        )}

        <h5 className={styles.upcomingHeader}>{t('upcomingCheckups', 'Próximos controles')}</h5>
        {isLoadingAppointments ? (
          <InlineLoading description={t('loadingAppointments', 'Cargando citas...')} />
        ) : (
          credAppointments.map((appt) => (
            <div key={appt.uuid} className={styles.checkupItem}>
              <span>{appt.service?.name || appt.service?.name || 'CRED'}</span>
              <span className={styles.dueDate}>
                {t('dueAt', 'A los')} {appt.startDateTime ? formatDate(new Date(appt.startDateTime)) : ''}
              </span>
              <Tag type="blue">{appt.status || t('pending', 'Pendiente')}</Tag>
              <Button
                kind="ghost"
                size="sm"
                renderIcon={AddIcon}
                iconDescription={t('addData', 'Agregar control')}
                onClick={() => handleAddCredControl(appt)}
              >
                {t('add', 'Agregar')}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CredCheckups;
