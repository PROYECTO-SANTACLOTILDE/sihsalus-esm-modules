import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import { CheckmarkFilled, Time } from '@carbon/react/icons';
import { useScreeningIndicators } from '../../../hooks/useScreeningIndicators';
import styles from './screening-indicators.scss';

interface ScreeningIndicatorsProps {
  patientUuid: string;
}

/**
 * Widget de tamizajes obligatorios según NTS 137 (CRED).
 * Muestra estado de tamizajes: hemoglobina, desarrollo, violencia, visual, auditivo.
 */
const ScreeningIndicators: React.FC<ScreeningIndicatorsProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { screenings, completedCount, totalRequired, percentage, isLoading, error } =
    useScreeningIndicators(patientUuid);

  if (isLoading) return <Tile className={styles.card}>{t('loading', 'Cargando...')}</Tile>;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('screeningIndicators', 'Tamizajes Obligatorios')}</h5>
        <Tag type={completedCount === totalRequired ? 'green' : 'gray'} size="sm">
          {completedCount}/{totalRequired}
        </Tag>
      </div>
      <div className={styles.content}>
        {screenings.length > 0 ? (
          screenings.map((screening, idx) => (
            <div key={idx} className={styles.screeningRow}>
              {screening.completed ? (
                <CheckmarkFilled size={16} className={styles.iconSuccess} />
              ) : (
                <Time size={16} className={styles.iconPending} />
              )}
              <span className={screening.completed ? styles.completed : styles.pending}>{screening.name}</span>
              {screening.date && <span className={styles.date}>{screening.date}</span>}
            </div>
          ))
        ) : (
          <p className={styles.noData}>{t('noScreeningData', 'Sin datos de tamizaje registrados')}</p>
        )}
      </div>
      {error && <p className={styles.error}>{t('errorLoading', 'Error al cargar datos')}</p>}
    </Tile>
  );
};

export default ScreeningIndicators;
