import React, { useMemo } from 'react';
import { UserFollow, Task, ChartLineData } from '@carbon/react/icons';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';

export interface PrenatalCareProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const PrenatalCare: React.FC<PrenatalCareProps> = ({ patient, patientUuid }) => {
  console.log('🏥 PrenatalCare Debug:', { patient: !!patient, patientUuid, patientId: patient?.id });

  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: 'maternalHistory',
        icon: UserFollow,
        slotName: 'prenatal-maternal-history-slot',
      },
      {
        labelKey: 'currentPregnancy',
        icon: Task,
        slotName: 'prenatal-current-pregnancy-slot',
      },
      {
        labelKey: 'prenatalCareChart',
        icon: ChartLineData,
        slotName: 'prenatal-care-chart-slot',
      },
    ],
    [],
  );

  if (!patient || !patientUuid) {
    console.log('❌ PrenatalCare: Missing patient data, returning null');
    return <div style={{padding: '20px', background: 'yellow', border: '2px red solid'}}>
      DEBUG: PrenatalCare - Missing patient data (patient: {!!patient ? 'exists' : 'missing'}, patientUuid: {patientUuid || 'missing'})
    </div>;
  }

  return (
    <TabbedDashboard
      patient={patient}
      patientUuid={patientUuid}
      titleKey="prenatalCare"
      tabs={tabs}
      ariaLabelKey="prenatalCareTabs"
    />
  );
};
