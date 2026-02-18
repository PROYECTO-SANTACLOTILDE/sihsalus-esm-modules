import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import styles from './nutritional-assessment.scss';

interface NutritionalAssessmentProps {
  patientUuid: string;
}

/**
 * Widget de evaluación nutricional según NTS 137-MINSA (CRED).
 * Muestra indicadores P/E, T/E, P/T, IMC y diagnóstico nutricional.
 */
const NutritionalAssessment: React.FC<NutritionalAssessmentProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const weightForAge = null;
  const heightForAge = null;
  const weightForHeight = null;
  const nutritionalDiagnosis = null;
  const lastMeasurementDate = null;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('cnAssessmentTitle', 'Estado Nutricional')}</h5>
        <Tag type={nutritionalDiagnosis ? 'green' : 'gray'} size="sm">
          {nutritionalDiagnosis ?? t('noData', 'Sin datos')}
        </Tag>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnWeightForAge', 'Peso/Edad (P/E)')}:</span>
          <span className={styles.value}>{weightForAge ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnHeightForAge', 'Talla/Edad (T/E)')}:</span>
          <span className={styles.value}>{heightForAge ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnWeightForHeight', 'Peso/Talla (P/T)')}:</span>
          <span className={styles.value}>{weightForHeight ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnDiagnosis', 'Diagnóstico nutricional')}:</span>
          <span className={styles.value}>{nutritionalDiagnosis ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('cnLastMeasurement', 'Última medición')}:</span>
          <span className={styles.value}>{lastMeasurementDate ?? t('noData', 'Sin datos')}</span>
        </div>
      </div>
    </Tile>
  );
};

export default NutritionalAssessment;
