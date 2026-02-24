import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, TabList, Tabs, TabPanel, TabPanels } from '@carbon/react';
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
    <div className={styles.appointmentList}>
      <div className={styles.tabs}>
        <Tabs selectedIndex={selectedTab} onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}>
          <TabList style={{ paddingLeft: '1rem' }} aria-label="FUA tabs" contained>
            {filteredExtensions.map((extension) => {
              const { title } = extension.meta;
              return (
                <Tab key={extension.id} className={styles.tab}>
                  {t(title, {
                    ns: extension.moduleName,
                    defaultValue: title,
                  })}
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            {filteredExtensions.map((extension, index) => (
              <TabPanel key={extension.id} className={styles.tabPanel}>
                {index === selectedTab && <ExtensionSlot name={fuaPanelSlot} select={select} />}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default FuaOrdersTabs;
