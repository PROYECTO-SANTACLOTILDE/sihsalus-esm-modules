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
  pageSize = 5,
  className,
  state = {},
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState(0);

  const translatedTabs = useMemo(() => tabs.map((tab) => ({ ...tab, label: t(tab.labelKey) })), [tabs, t]);

  return (
    <div className={classNames(styles.widgetCard, className)}>
      <Layer>
        <Tile>
          <div className={styles.desktopHeading}>
            <h4>{t(titleKey)}</h4>
          </div>
        </Tile>
      </Layer>
      <Layer>
        <div style={{ borderBottom: '1px solid #ccc' }}>
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
              }}>
              🏷️ {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px' }}>
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
