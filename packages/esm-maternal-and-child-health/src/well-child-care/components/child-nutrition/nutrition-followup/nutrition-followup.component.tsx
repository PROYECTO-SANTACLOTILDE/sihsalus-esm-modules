import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tag,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '@carbon/react';
import { CardHeader } from '@openmrs/esm-patient-common-lib';
import styles from './nutrition-followup.scss';

interface NutritionFollowupProps {
  patientUuid: string;
}

const NutritionFollowup: React.FC<NutritionFollowupProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('cnFollowUpTitle', 'Seguimiento Nutricional');

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const weightTrend = null;
  const growthStatus = null;
  const mmnStatus = null;
  const nextCheckDate = null;

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <Tag type="gray" size="sm">
          {growthStatus ?? t('pending', 'Pendiente')}
        </Tag>
      </CardHeader>
      <div className={styles.container}>
        <StructuredListWrapper isCondensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnWeightTrend', 'Tendencia de peso')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {weightTrend ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnGrowthMonitoring', 'Monitoreo del crecimiento')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {growthStatus ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnMmnStatus', 'Suplementación MMN')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {mmnStatus ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnNextCheck', 'Próximo control')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {nextCheckDate ?? <span className={styles.noData}>{t('pending', 'Pendiente')}</span>}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
};

export default NutritionFollowup;
