import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import { CheckmarkFilled, WarningFilled } from '@carbon/react/icons';
import { useBirthPlan } from '../../../../hooks/useBirthPlan';
import styles from './birth-plan.scss';

interface BirthPlanProps {
  patientUuid: string;
}

/**
 * Widget de plan de parto según NTS 105-MINSA.
 * Muestra si la gestante tiene plan de parto elaborado a partir de semana 32.
 */
const BirthPlan: React.FC<BirthPlanProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { hasBirthPlan, planDate, transportArranged, referenceHospital, isLoading, error } =
    useBirthPlan(patientUuid);

  if (isLoading) return <Tile className={styles.card}>{t('loading', 'Cargando...')}</Tile>;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('birthPlan', 'Plan de Parto')}</h5>
        <Tag type={hasBirthPlan ? 'green' : 'red'} size="sm">
          {hasBirthPlan ? t('elaborated', 'Elaborado') : t('pending', 'Pendiente')}
        </Tag>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          {hasBirthPlan ? <CheckmarkFilled size={16} className={styles.iconSuccess} /> : <WarningFilled size={16} className={styles.iconWarning} />}
          <span>{t('birthPlanStatus', hasBirthPlan ? 'Plan elaborado' : 'Plan de parto no registrado')}</span>
        </div>
        {planDate && (
          <div className={styles.row}>
            <span className={styles.label}>{t('planDate', 'Fecha de elaboración')}:</span>
            <span className={styles.value}>{planDate}</span>
          </div>
        )}
        {referenceHospital && (
          <div className={styles.row}>
            <span className={styles.label}>{t('referenceHospital', 'Hospital de referencia')}:</span>
            <span className={styles.value}>{referenceHospital}</span>
          </div>
        )}
      </div>
      {error && <p className={styles.error}>{t('errorLoading', 'Error al cargar datos')}</p>}
    </Tile>
  );
};

export default BirthPlan;
