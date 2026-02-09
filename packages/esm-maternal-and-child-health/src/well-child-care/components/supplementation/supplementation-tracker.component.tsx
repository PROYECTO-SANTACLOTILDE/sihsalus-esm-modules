import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag, ProgressBar } from '@carbon/react';
import { useSupplementationTracker } from '../../../hooks/useSupplementationTracker';
import styles from './supplementation-tracker.scss';

interface SupplementationTrackerProps {
  patientUuid: string;
}

/**
 * Widget de tracking de suplementación MMN según Directiva 068-MINSA.
 * 360 sobres de multimicronutrientes desde los 6 meses.
 */
const SupplementationTracker: React.FC<SupplementationTrackerProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { delivered, total, percentage, isComplete, isLoading, error } = useSupplementationTracker(patientUuid);

  if (isLoading) return <Tile className={styles.card}>{t('loading', 'Cargando...')}</Tile>;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('mmnSupplementation', 'Suplementación MMN')}</h5>
        <Tag type={isComplete ? 'green' : 'blue'} size="sm">
          {isComplete ? t('complete', 'Completo') : t('inProgress', 'En curso')}
        </Tag>
      </div>
      <div className={styles.content}>
        <ProgressBar
          label={`${delivered}/${total} ${t('sachets', 'sobres')}`}
          value={percentage}
          size="small"
          status={isComplete ? 'finished' : 'active'}
        />
        <p className={styles.description}>
          {t('mmnDescription', 'Directiva 068: 1 sobre diario desde los 6 meses')}
        </p>
      </div>
      {error && <p className={styles.error}>{t('errorLoading', 'Error al cargar datos')}</p>}
    </Tile>
  );
};

export default SupplementationTracker;
