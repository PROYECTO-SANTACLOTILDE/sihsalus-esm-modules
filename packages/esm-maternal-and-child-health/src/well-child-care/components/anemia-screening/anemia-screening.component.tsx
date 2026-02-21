import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DataTableSkeleton,
  Tag,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '@carbon/react';
import { WarningFilled, CheckmarkFilled } from '@carbon/react/icons';
import { CardHeader, ErrorState } from '@openmrs/esm-patient-common-lib';
import { useAnemiaScreening } from '../../../hooks/useAnemiaScreening';
import styles from './anemia-screening.scss';

interface AnemiaScreeningProps {
  patientUuid: string;
}

const AnemiaScreening: React.FC<AnemiaScreeningProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { lastHb, lastDate, isAnemic, nextDueDate, isLoading, error } = useAnemiaScreening(patientUuid);
  const headerTitle = t('anemiaScreening', 'Tamizaje de Anemia');

  if (isLoading) {
    return <DataTableSkeleton role="progressbar" compact rowCount={3} columnCount={2} />;
  }

  if (error) {
    return <ErrorState error={error} headerTitle={headerTitle} />;
  }

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        {lastHb !== null && (
          <Tag
            type={isAnemic ? 'red' : 'green'}
            size="sm"
            renderIcon={isAnemic ? WarningFilled : CheckmarkFilled}
          >
            {isAnemic ? t('anemic', 'Anemia') : t('normal', 'Normal')}
          </Tag>
        )}
      </CardHeader>
      <div className={styles.container}>
        <StructuredListWrapper isCondensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('lastHb', 'Última Hb')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastHb !== null ? (
                  <span className={isAnemic ? styles.anemic : styles.normalValue}>{lastHb} g/dL</span>
                ) : (
                  <span className={styles.noData}>{t('noData', 'Sin datos')}</span>
                )}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('lastDate', 'Fecha')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastDate ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('nextScreening', 'Próximo tamizaje')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {nextDueDate ?? <span className={styles.noData}>{t('pending', 'Pendiente')}</span>}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
};

export default AnemiaScreening;
