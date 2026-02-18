import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import styles from './stimulation-followup.scss';

interface StimulationFollowupProps {
  patientUuid: string;
}

/**
 * Widget de seguimiento del desarrollo según NTS 137-MINSA (CRED).
 * Muestra hitos alcanzados, resultados de evaluaciones y próxima evaluación.
 */
const StimulationFollowup: React.FC<StimulationFollowupProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const milestonesAchieved = null;
  const lastEvaluationResult = null;
  const lastEvaluationDate = null;
  const nextEvaluationDate = null;
  const riskLevel = null;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('esFollowUpTitle', 'Seguimiento del Desarrollo')}</h5>
        <Tag type={riskLevel === 'normal' ? 'green' : riskLevel ? 'red' : 'gray'} size="sm">
          {riskLevel ?? t('noData', 'Sin datos')}
        </Tag>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>{t('esMilestones', 'Hitos alcanzados')}:</span>
          <span className={styles.value}>{milestonesAchieved ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('esLastEvaluation', 'Última evaluación')}:</span>
          <span className={styles.value}>{lastEvaluationResult ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('lastDate', 'Fecha')}:</span>
          <span className={styles.value}>{lastEvaluationDate ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('esNextEvaluation', 'Próxima evaluación')}:</span>
          <span className={styles.value}>{nextEvaluationDate ?? t('pending', 'Pendiente')}</span>
        </div>
      </div>
    </Tile>
  );
};

export default StimulationFollowup;
