import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import styles from './stimulation-sessions.scss';

interface StimulationSessionsProps {
  patientUuid: string;
}

/**
 * Widget de sesiones de estimulación temprana según NTS 137-MINSA (CRED).
 * Muestra sesiones realizadas, áreas de desarrollo y última sesión.
 */
const StimulationSessions: React.FC<StimulationSessionsProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const totalSessions = null;
  const lastSessionDate = null;
  const developmentAreas = null;
  const nextSessionDate = null;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('esSessionsTitle', 'Sesiones de Estimulación')}</h5>
        <Tag type={totalSessions ? 'blue' : 'gray'} size="sm">
          {totalSessions ? `${totalSessions} ${t('sessions', 'sesiones')}` : t('noData', 'Sin datos')}
        </Tag>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>{t('esSessionsCompleted', 'Sesiones realizadas')}:</span>
          <span className={styles.value}>{totalSessions ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('esDevelopmentAreas', 'Áreas de desarrollo')}:</span>
          <span className={styles.value}>{developmentAreas ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('lastSession', 'Última sesión')}:</span>
          <span className={styles.value}>{lastSessionDate ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('fpNextSession', 'Próxima sesión')}:</span>
          <span className={styles.value}>{nextSessionDate ?? t('pending', 'Pendiente')}</span>
        </div>
      </div>
    </Tile>
  );
};

export default StimulationSessions;
