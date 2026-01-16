import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { navigate } from '@openmrs/esm-framework';
import useFuaRequests from '../hooks/useFuaRequests';
import styles from './tile.scss';

const CompletedFuaRequestsTile: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFuaRequests();

  const count = data?.filter(req => req.fuaEstado?.nombre === 'completed').length || 0;

  const handleTileClick = () => {
    navigate({
      to: `${window.spaBase}/home/fua-request`,
    });
  };

  return (
    <Tile className={styles.tileContainer} onClick={handleTileClick}>
      <div className={styles.tileHeader}>
        <div>
          <span className={styles.headerLabelText}>{t('results', 'Resultados')}</span>
        </div>
      </div>
      <div>
        <label className={styles.totalsLabel}>{t('completed', 'Completados')}</label>
        <p className={styles.totalsValue}>{isLoading ? '--' : count}</p>
      </div>
      <div className={styles.footerContainer}>
        <ArrowRight size={16} className={styles.arrowIcon} />
      </div>
    </Tile>
  );
};

export default CompletedFuaRequestsTile;
