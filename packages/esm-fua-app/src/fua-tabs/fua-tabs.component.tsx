import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type AssignedExtension, ExtensionSlot, useAssignedExtensions } from '@openmrs/esm-framework';
import styles from './fua-tabs.scss';

const fuaPanelSlot = 'fua-panels-slot';

const FuaOrdersTabs: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabExtensions = useAssignedExtensions(fuaPanelSlot) as AssignedExtension[];

  const filteredExtensions = useMemo(
    () => tabExtensions.filter((ext) => Object.keys(ext.meta).length > 0),
    [tabExtensions],
  );

  const select = useCallback(
    (extensions: Array<AssignedExtension>) => {
      const withMeta = extensions.filter((ext) => Object.keys(ext.meta).length > 0);
      const selected = withMeta[selectedTab];
      return selected ? [selected] : [];
    },
    [selectedTab],
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
              key={extension.id}
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

      {/* Tab panel — only the selected extension is rendered */}
      <div className={styles.customTabPanels}>
        <div className={styles.customTabPanel}>
          <ExtensionSlot name={fuaPanelSlot} select={select} />
        </div>
      </div>
    </div>
  );
};

export default FuaOrdersTabs;
