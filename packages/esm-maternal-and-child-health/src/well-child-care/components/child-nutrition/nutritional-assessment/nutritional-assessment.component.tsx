import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tag,
  Button,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { CardHeader } from '@openmrs/esm-patient-common-lib';
import { launchWorkspace2, useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../../../../config-schema';
import styles from './nutritional-assessment.scss';

interface NutritionalAssessmentProps {
  patientUuid: string;
}

const NutritionalAssessment: React.FC<NutritionalAssessmentProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig<ConfigObject>();
  const headerTitle = t('cnAssessmentTitle', 'Estado Nutricional');

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const weightForAge = null;
  const heightForAge = null;
  const weightForHeight = null;
  const nutritionalDiagnosis = null;
  const lastMeasurementDate = null;

  const handleAdd = useCallback(() => {
    const formUuid = config.formsList.nutritionalAssessmentForm;
    if (!formUuid) return;
    launchWorkspace2('patient-form-entry-workspace', {
      form: { uuid: formUuid },
      encounterUuid: '',
    });
  }, [config.formsList.nutritionalAssessmentForm]);

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <Tag type={nutritionalDiagnosis ? 'green' : 'gray'} size="sm">
          {nutritionalDiagnosis ?? t('noData', 'Sin datos')}
        </Tag>
        <Button kind="ghost" size="sm" renderIcon={Add} onClick={handleAdd} iconDescription={t('add', 'Agregar')}>
          {t('add', 'Agregar')}
        </Button>
      </CardHeader>
      <div className={styles.container}>
        <StructuredListWrapper isCondensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnWeightForAge', 'Peso/Edad (P/E)')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {weightForAge ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnHeightForAge', 'Talla/Edad (T/E)')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {heightForAge ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnWeightForHeight', 'Peso/Talla (P/T)')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {weightForHeight ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnDiagnosis', 'Diagnóstico nutricional')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {nutritionalDiagnosis ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('cnLastMeasurement', 'Última medición')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastMeasurementDate ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
};

export default NutritionalAssessment;
