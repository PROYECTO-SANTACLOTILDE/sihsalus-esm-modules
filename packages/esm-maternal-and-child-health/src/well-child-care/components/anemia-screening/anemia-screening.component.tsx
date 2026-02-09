import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, Tag } from '@carbon/react';
import { WarningFilled, CheckmarkFilled } from '@carbon/react/icons';
import { useAnemiaScreening } from '../../../hooks/useAnemiaScreening';
import styles from './anemia-screening.scss';

interface AnemiaScreeningProps {
  patientUuid: string;
}

/**
 * Widget de tamizaje de anemia según NTS 137 (CRED).
 * Muestra último valor de Hb, estado de anemia, y próximo control.
 */
const AnemiaScreening: React.FC<AnemiaScreeningProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { lastHb, lastDate, isAnemic, nextDueDate, isLoading, error } = useAnemiaScreening(patientUuid);

  if (isLoading) return <Tile className={styles.card}>{t('loading', 'Cargando...')}</Tile>;

  return (
    <Tile className={styles.card}>
      <div className={styles.header}>
        <h5>{t('anemiaScreening', 'Tamizaje de Anemia')}</h5>
        {lastHb !== null && (
          <Tag type={isAnemic ? 'red' : 'green'} size="sm">
            {isAnemic ? t('anemic', 'Anemia') : t('normal', 'Normal')}
          </Tag>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>{t('lastHb', 'Última Hb')}:</span>
          <span className={styles.value}>{lastHb !== null ? `${lastHb} g/dL` : t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('lastDate', 'Fecha')}:</span>
          <span className={styles.value}>{lastDate ?? t('noData', 'Sin datos')}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('nextScreening', 'Próximo tamizaje')}:</span>
          <span className={styles.value}>{nextDueDate ?? t('pending', 'Pendiente')}</span>
        </div>
      </div>
      {error && <p className={styles.error}>{t('errorLoading', 'Error al cargar datos')}</p>}
    </Tile>
  );
};

export default AnemiaScreening;
