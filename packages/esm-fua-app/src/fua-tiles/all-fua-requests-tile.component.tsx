import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tile } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { useAppContext, navigate } from '@openmrs/esm-framework';
import { type DateFilterContext } from '../types';
import useFuaRequests from '../hooks/useFuaRequests';
import styles from './tile.scss';

const AllFuaRequestsTile: React.FC = () => {
  console.log('🟦 ALL FUA REQUESTS TILE RENDERING');
  const { t } = useTranslation();
  const { data, isLoading } = useFuaRequests();

  const count = data?.length || 0;
  console.log('🟦 Tile data:', { data, isLoading, count });

  const handleTileClick = () => {
    navigate({
      to: `${window.spaBase}/home/fua-request`,
    });
  };

  return (
    <Tile className={styles.tileContainer} onClick={handleTileClick} style={{ border: '2px solid blue', backgroundColor: 'lightyellow' }}>
      <div className={styles.tileHeader}>
        <div>
          <span className={styles.headerLabelText}>{t('fuasOrdered', 'FUAs solicitados')}</span>
        </div>
      </div>
      <div>
        <label className={styles.totalsLabel}>{t('orders', 'Ordenes')}</label>
        <p className={styles.totalsValue}>{isLoading ? '--' : count}</p>
      </div>
      <div className={styles.footerContainer}>
        <ArrowRight size={16} className={styles.arrowIcon} />
      </div>
    </Tile>
  );
};

export default AllFuaRequestsTile;
