import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableSkeleton, Tag, ProgressBar } from '@carbon/react';
import { CardHeader, ErrorState } from '@openmrs/esm-patient-common-lib';
import { useSupplementationTracker } from '../../../hooks/useSupplementationTracker';
import styles from './supplementation-tracker.scss';

interface SupplementationTrackerProps {
  patientUuid: string;
}

const SupplementationTracker: React.FC<SupplementationTrackerProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { delivered, total, percentage, isComplete, isLoading, error } = useSupplementationTracker(patientUuid);
  const headerTitle = t('mmnSupplementation', 'Suplementación MMN');

  if (isLoading) {
    return <DataTableSkeleton role="progressbar" compact rowCount={2} columnCount={2} />;
  }

  if (error) {
    return <ErrorState error={error} headerTitle={headerTitle} />;
  }

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <Tag type={isComplete ? 'green' : 'blue'} size="sm">
          {isComplete ? t('complete', 'Completo') : t('inProgress', 'En curso')}
        </Tag>
      </CardHeader>
      <div className={styles.container}>
        <ProgressBar
          label={`${delivered}/${total} ${t('sachets', 'sobres')}`}
          value={percentage}
          size="small"
          status={isComplete ? 'finished' : 'active'}
        />
        <p className={styles.helperText}>
          {t('mmnDescription', 'Directiva 068: 1 sobre diario desde los 6 meses')}
        </p>
      </div>
    </div>
  );
};

export default SupplementationTracker;
