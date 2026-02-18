import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import styles from './feeding-counseling.scss';

interface FeedingCounselingProps {
  patientUuid: string;
}

/**
 * Widget de consejería alimentaria según NTS 137-MINSA (CRED).
 * Muestra tipo de alimentación por edad, última sesión y recomendaciones.
 */
const FeedingCounseling: React.FC<FeedingCounselingProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const feedingType = null;
  const lastCounselingDate = null;
  const nextSession = null;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('cnCounselingTitle', 'Consejería Alimentaria')}</h5>
        <Tag type={lastCounselingDate ? 'green' : 'gray'} size="sm">
          {lastCounselingDate ? t('completed', 'Completado') : t('pending', 'Pendiente')}
        </Tag>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnFeedingType', 'Tipo de alimentación')}:</span>
          <span className={styles.value}>{feedingType ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('lastSession', 'Última sesión')}:</span>
          <span className={styles.value}>{lastCounselingDate ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('fpNextSession', 'Próxima sesión')}:</span>
          <span className={styles.value}>{nextSession ?? t('pending', 'Pendiente')}</span>
        </div>
      </div>
    </Tile>
  );
};

export default FeedingCounseling;
