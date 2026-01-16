import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type AssignedExtension, Extension, useAssignedExtensions } from '@openmrs/esm-framework';
import { ComponentContext } from '@openmrs/esm-framework/src/internal';
import styles from './fua-tabs.scss';

const fuaPanelSlot = 'fua-panels-slot';

const FuaOrdersTabs: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabExtensions = useAssignedExtensions(fuaPanelSlot) as AssignedExtension[];

  const filteredExtensions = tabExtensions.filter((extension) => Object.keys(extension.meta).length > 0);

  if (filteredExtensions.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <p>No tab extensions found</p>
      </div>
    );
  }

  return (
    <div className={styles.customTabsContainer}>
      {/* Tab buttons */}
      <div className={styles.customTabList}>
        {filteredExtensions.map((extension, index) => {
          const { name, title } = extension.meta;
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
        {filteredExtensions.map((extension, index) => {
          if (selectedTab !== index) return null;

          return (
            <div key={index} className={styles.customTabPanel}>
              <ComponentContext.Provider
                value={{
                  moduleName: extension.moduleName,
                  featureName: 'fua',
                  extension: {
                    extensionId: extension.id,
                    extensionSlotName: fuaPanelSlot,
                    extensionSlotModuleName: extension.moduleName,
                  },
                }}
              >
                <Extension />
              </ComponentContext.Provider>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FuaOrdersTabs;
