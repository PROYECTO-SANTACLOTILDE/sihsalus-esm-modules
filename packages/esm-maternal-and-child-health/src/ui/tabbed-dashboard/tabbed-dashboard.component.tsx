// ../ui/tabbed-dashboard/tabbed-dashboard.component.tsx
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { Layer, Tile } from '@carbon/react';
import styles from './tabbed-dashboard.scss';

export interface TabConfig {
  labelKey: string;
  icon: React.ComponentType;
  slotName: string;
}

interface TabbedDashboardProps {
  patient: fhir.Patient;
  patientUuid: string;
  titleKey: string;
  tabs: TabConfig[];
  ariaLabelKey: string;
  pageSize?: number;
  className?: string;
  state?: Record<string, any>;
}

const TabbedDashboard: React.FC<TabbedDashboardProps> = ({
  patient,
  patientUuid,
  titleKey,
  tabs,
  ariaLabelKey,
  pageSize = 5,
  className,
  state = {},
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState(0);

  const translatedTabs = useMemo(() => tabs.map((tab) => ({ ...tab, label: t(tab.labelKey) })), [tabs, t]);

  console.log('🐛 TabbedDashboard Debug:', {
    patient: !!patient,
    patientUuid,
    titleKey,
    tabsCount: tabs.length,
    translatedTabs: translatedTabs.map(tab => ({ labelKey: tab.labelKey, label: tab.label, slotName: tab.slotName })),
    title: t(titleKey),
    activeTab,
  });

  return (
    <div className={classNames(styles.widgetCard, className)}>
      <div style={{padding: '10px', background: 'lightgreen', border: '2px solid green', marginBottom: '10px'}}>
        🐛 DEBUG: TabbedDashboard is rendering! Title: {t(titleKey)} | Tabs: {tabs.length}
      </div>
      <Layer>
        <Tile>
          <div className={styles.desktopHeading}>
            <h4>{t(titleKey)}</h4>
          </div>
        </Tile>
      </Layer>
      <Layer>
        <div style={{padding: '10px', background: 'lightblue', border: '2px solid blue', marginBottom: '10px'}}>
          🔍 DEBUG: About to render {translatedTabs.length} tabs: {translatedTabs.map(t => t.label).join(', ')}
        </div>
        
        {/* Custom Tab Implementation */}
        <div style={{borderBottom: '1px solid #ccc'}}>
          {translatedTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              style={{
                padding: '12px 16px',
                marginRight: '4px',
                border: 'none',
                borderBottom: activeTab === index ? '3px solid #0066cc' : '3px solid transparent',
                background: activeTab === index ? '#f4f4f4' : 'transparent',
                cursor: 'pointer',
                fontWeight: activeTab === index ? 'bold' : 'normal',
              }}
            >
              🏷️ {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div style={{padding: '20px'}}>
          <div style={{padding: '10px', background: 'lightyellow', marginBottom: '10px'}}>
            📋 Active Tab: {activeTab} - {translatedTabs[activeTab]?.label} - Slot: {translatedTabs[activeTab]?.slotName}
          </div>
          
          <ExtensionSlot 
            key={translatedTabs[activeTab]?.slotName} 
            name={translatedTabs[activeTab]?.slotName} 
            className={styles.dashboard}
            state={{
              patient,
              patientUuid,
              pageSize,
              ...state,
            }}
          />
        </div>
      </Layer>
    </div>
  );
};

export default TabbedDashboard;
