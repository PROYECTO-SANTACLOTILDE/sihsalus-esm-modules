import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { type AssignedExtension, Extension, useAssignedExtensions } from '@openmrs/esm-framework';
import { ComponentContext } from '@openmrs/esm-framework/src/internal';
import styles from './fua-tabs.scss';

const fuaPanelSlot = 'fua-panels-slot';

const FuaOrdersTabs: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabExtensions = useAssignedExtensions(fuaPanelSlot) as AssignedExtension[];

  console.log('🟩 FUA ORDERS TABS RENDERING');
  console.log('🟩 tabExtensions:', tabExtensions);
  console.log('🟩 tabExtensions.length:', tabExtensions.length);

  const filteredExtensions = tabExtensions.filter((extension) => Object.keys(extension.meta).length > 0);
  console.log('🟩 filteredExtensions:', filteredExtensions);
  console.log('🟩 filteredExtensions.length:', filteredExtensions.length);

  if (filteredExtensions.length === 0) {
    console.log('🟩 ⚠️ NO EXTENSIONS FOUND!');
  }

  return (
    <main>
      <h3 style={{ color: 'green', padding: '10px' }}>
        DEBUG: Found {filteredExtensions.length} tab extensions
      </h3>
      {filteredExtensions.length === 0 ? (
        <div style={{ padding: '20px', backgroundColor: 'yellow' }}>
          <p>⚠️ NO TAB EXTENSIONS LOADED</p>
        </div>
      ) : (
        <section>
          <div className={styles.tabs}>
            <Tabs selectedIndex={selectedTab} onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}>
              <TabList style={{ paddingLeft: '1rem' }} aria-label="FUA tabs" contained>
                {filteredExtensions.map((extension, index) => {
                  const { name, title } = extension.meta;
                  console.log(`🟩 Rendering tab ${index}:`, { name, title });

                  if (name && title) {
                    return (
                      <Tab key={index} className={styles.tab} id={`${title || index}-tab`}>
                        {t(title, {
                          ns: extension.moduleName,
                          defaultValue: title,
                        })}
                      </Tab>
                    );
                  } else {
                    console.log(`🟩 ⚠️ Skipping tab ${index} - missing name or title`);
                    return null;
                  }
                })}
              </TabList>
            <TabPanels>
              {filteredExtensions.map((extension, index) => {
                return (
                  <TabPanel key={`${extension.meta.title}-tab-${index}`}>
                    <ComponentContext.Provider
                      key={extension.id}
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
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </div>
      </section>
      )}
    </main>
  );
};

export default FuaOrdersTabs;
