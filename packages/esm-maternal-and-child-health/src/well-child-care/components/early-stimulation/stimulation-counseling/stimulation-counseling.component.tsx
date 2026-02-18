import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import styles from './stimulation-counseling.scss';

interface StimulationCounselingProps {
  patientUuid: string;
}

/**
 * Widget de consejería a padres sobre estimulación temprana según NTS 137-MINSA.
 * Muestra sesiones de consejería, actividades para el hogar y próxima sesión.
 */
const StimulationCounseling: React.FC<StimulationCounselingProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const parentSessions = null;
  const lastCounselingDate = null;
  const homeActivities = null;
  const nextCounselingDate = null;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('esCounselingTitle', 'Consejería a Padres')}</h5>
        <Tag type={parentSessions ? 'blue' : 'gray'} size="sm">
          {parentSessions ? `${parentSessions} ${t('sessions', 'sesiones')}` : t('noData', 'Sin datos')}
        </Tag>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>{t('esCounselingSessions', 'Sesiones de consejería')}:</span>
          <span className={styles.value}>{parentSessions ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('lastSession', 'Última sesión')}:</span>
          <span className={styles.value}>{lastCounselingDate ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('esHomeActivities', 'Actividades para el hogar')}:</span>
          <span className={styles.value}>{homeActivities ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('fpNextSession', 'Próxima sesión')}:</span>
          <span className={styles.value}>{nextCounselingDate ?? t('pending', 'Pendiente')}</span>
        </div>
      </div>
    </Tile>
  );
};

export default StimulationCounseling;
