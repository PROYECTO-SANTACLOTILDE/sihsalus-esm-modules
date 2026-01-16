import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import styles from './fua-summary-tiles.scss';

const FuaSummaryTiles: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      <ExtensionSlot name="fua-tiles-slot" />
    </div>
  );
};

export default FuaSummaryTiles;
