import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import styles from './nutrition-followup.scss';

interface NutritionFollowupProps {
  patientUuid: string;
}

/**
 * Widget de seguimiento nutricional según NTS 137-MINSA (CRED).
 * Muestra tendencia de peso, monitoreo del crecimiento y próxima cita.
 */
const NutritionFollowup: React.FC<NutritionFollowupProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const weightTrend = null;
  const growthStatus = null;
  const mmnStatus = null;
  const nextCheckDate = null;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('cnFollowUpTitle', 'Seguimiento Nutricional')}</h5>
        <Tag type="gray" size="sm">
          {growthStatus ?? t('pending', 'Pendiente')}
        </Tag>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnWeightTrend', 'Tendencia de peso')}:</span>
          <span className={styles.value}>{weightTrend ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnGrowthMonitoring', 'Monitoreo del crecimiento')}:</span>
          <span className={styles.value}>{growthStatus ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnMmnStatus', 'Suplementación MMN')}:</span>
          <span className={styles.value}>{mmnStatus ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnNextCheck', 'Próximo control')}:</span>
          <span className={styles.value}>{nextCheckDate ?? t('pending', 'Pendiente')}</span>
        </div>
      </div>
    </Tile>
  );
};

export default NutritionFollowup;
