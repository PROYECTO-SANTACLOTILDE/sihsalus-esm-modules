import React from 'react';
import { useTranslation } from 'react-i18next';
import { type AssignedExtension, useAssignedExtensions, Extension, useConfig } from '@openmrs/esm-framework';
import { ComponentContext } from '@openmrs/esm-framework/src/internal';
import styles from './fua-summary-tiles.scss';
import { type Config } from '../config-schema';

const FuaSummaryTile: React.FC = () => {
  const { t } = useTranslation();
  const { enableReviewingLabResultsBeforeApproval } = useConfig<Config>();
  const fuaTileSlot = 'fua-tiles-slot';
  const tilesExtensions = useAssignedExtensions(fuaTileSlot) as AssignedExtension[];

  const filteredExtensions = tilesExtensions
    .filter((extension) => Object.keys(extension.meta).length > 0)
    .filter((extension) => {
      if (extension.name === 'pending-review-list-tile-component') {
        return enableReviewingLabResultsBeforeApproval === true;
      }
      return true;
    });
return (
    <div className={styles.cardContainer}>
      {filteredExtensions.map((extension, index) => {
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
