import React, { useMemo } from 'react';
import { type AssignedExtension, useAssignedExtensions, useRenderableExtensions, useConfig } from '@openmrs/esm-framework';
import styles from './fua-summary-tiles.scss';
import { type Config } from '../config-schema';

const FuaSummaryTiles: React.FC = () => {
  const { enableFuaApprovalWorkflow } = useConfig<Config>();
  const fuaTileSlot = 'fua-tiles-slot';
  const tilesExtensions = useAssignedExtensions(fuaTileSlot) as AssignedExtension[];
  const renderableExtensions = useRenderableExtensions(fuaTileSlot);

  const filteredRenderable = useMemo(() => {
    return tilesExtensions.reduce<React.FC[]>((acc, ext, i) => {
      const hasMeta = Object.keys(ext.meta).length > 0;
      const isAllowed =
        ext.name !== 'pending-review-list-tile-component' || enableFuaApprovalWorkflow === true;
      if (hasMeta && isAllowed) {
        acc.push(renderableExtensions[i]);
      }
      return acc;
    }, []);
  }, [tilesExtensions, renderableExtensions, enableFuaApprovalWorkflow]);

  return (
    <div className={styles.cardContainer}>
      {filteredRenderable.map((Ext, index) => (
        <Ext key={index} />
      ))}
    </div>
  );
};

export default FuaSummaryTiles;
