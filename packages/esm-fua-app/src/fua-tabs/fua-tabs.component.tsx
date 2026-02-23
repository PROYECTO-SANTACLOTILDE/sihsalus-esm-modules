import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type AssignedExtension, useAssignedExtensions, useRenderableExtensions } from '@openmrs/esm-framework';
import styles from './fua-tabs.scss';

const fuaPanelSlot = 'fua-panels-slot';

const FuaOrdersTabs: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabExtensions = useAssignedExtensions(fuaPanelSlot) as AssignedExtension[];
  const renderableExtensions = useRenderableExtensions(fuaPanelSlot);

  const filteredIndices = useMemo(
    () =>
      tabExtensions.reduce<number[]>((acc, ext, i) => {
        if (Object.keys(ext.meta).length > 0) {
          acc.push(i);
        }
        return acc;
      }, []),
    [tabExtensions],
  );

  const filteredExtensions = useMemo(
    () => filteredIndices.map((i) => tabExtensions[i]),
    [filteredIndices, tabExtensions],
  );

  const filteredRenderable = useMemo(
    () => filteredIndices.map((i) => renderableExtensions[i]),
    [filteredIndices, renderableExtensions],
  );

  if (filteredExtensions.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <p>{t('noTabExtensionsFound', 'No tab extensions found')}</p>
      </div>
    );
  }

  return (
    <div className={styles.customTabsContainer}>
      {/* Tab buttons */}
      <div className={styles.customTabList}>
        {filteredExtensions.map((extension, index) => {
          const { title } = extension.meta;
          return (
            <button
              key={index}
              className={`${styles.customTab} ${selectedTab === index ? styles.customTabActive : ''}`}
              onClick={() => setSelectedTab(index)}
              aria-selected={selectedTab === index}
            >
              {t(title, {
                ns: extension.moduleName,
                defaultValue: title,
              })}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className={styles.customTabPanels}>
        {filteredRenderable.map((Ext, index) => {
          if (selectedTab !== index) return null;

          return (
            <div key={index} className={styles.customTabPanel}>
              <Ext />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FuaOrdersTabs;
