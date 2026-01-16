import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import styles from './fua-summary-tiles.scss';

const FuaSummaryTiles: React.FC = () => {
  console.log('🟨 FUA SUMMARY TILES RENDERING');
  return (
    <div className={styles.cardContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <ExtensionSlot name="fua-tiles-slot" />
    </div>
  );
};

export default FuaSummaryTiles;
