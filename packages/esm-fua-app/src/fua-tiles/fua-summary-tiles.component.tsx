import React from 'react';
import { type AssignedExtension, useAssignedExtensions, Extension } from '@openmrs/esm-framework';
import { ComponentContext } from '@openmrs/esm-framework/src/internal';
import styles from './fua-summary-tiles.scss';

const FuaSummaryTile: React.FC = () => {
  const fuaTileSlot = 'fua-tiles-slot';
  const tilesExtensions = useAssignedExtensions(fuaTileSlot) as AssignedExtension[];

  const filteredExtensions = tilesExtensions.filter((extension) => Object.keys(extension.meta).length > 0);

  return (
    <div className={styles.cardContainer}>
      {filteredExtensions.map((extension) => {
        return (
          <ComponentContext.Provider
            key={extension.id}
            value={{
              moduleName: extension.moduleName,
              featureName: 'fua',
              extension: {
                extensionId: extension.id,
                extensionSlotName: fuaTileSlot,
                extensionSlotModuleName: extension.moduleName,
              },
            }}
          >
            <Extension />
          </ComponentContext.Provider>
        );
      })}
    </div>
  );
};

export default FuaSummaryTile;
