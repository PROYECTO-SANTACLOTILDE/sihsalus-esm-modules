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
import styles from './feeding-counseling.scss';

interface FeedingCounselingProps {
  patientUuid: string;
}

const FeedingCounseling: React.FC<FeedingCounselingProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('cnCounselingTitle', 'Consejería Alimentaria');

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const feedingType = null;
  const lastCounselingDate = null;
  const nextSession = null;

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <Tag type={lastCounselingDate ? 'green' : 'gray'} size="sm">
          {lastCounselingDate ? t('completed', 'Completado') : t('pending', 'Pendiente')}
        </Tag>
      </CardHeader>
      <div className={styles.container}>
        <StructuredListWrapper isCondensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnFeedingType', 'Tipo de alimentación')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {feedingType ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('lastSession', 'Última sesión')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastCounselingDate ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('fpNextSession', 'Próxima sesión')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {nextSession ?? <span className={styles.noData}>{t('pending', 'Pendiente')}</span>}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
};

export default FeedingCounseling;
