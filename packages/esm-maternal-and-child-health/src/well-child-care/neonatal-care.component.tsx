import {
  Activity,
  CloudMonitoring,
  HospitalBed,
  Stethoscope,
  UserFollow,
  WatsonHealthCobbAngle,
} from '@carbon/react/icons';
import React, { useMemo } from 'react';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';

export interface NeonatalCareProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const NeonatalCare: React.FC<NeonatalCareProps> = ({ patient, patientUuid }) => {
  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: 'newbornVitals',
        icon: Activity,
        slotName: 'neonatal-vitals-slot',
      },
      {
        labelKey: 'perinatalRecord',
        icon: UserFollow,
        slotName: 'neonatal-perinatal-slot',
      },
      {
        labelKey: 'immediateAttention',
        icon: CloudMonitoring,
        slotName: 'neonatal-attention-slot',
      },
      {
        labelKey: 'cephalocaudalEvaluation',
        icon: Stethoscope,
        slotName: 'neonatal-evaluation-slot',
      },
      {
        labelKey: 'alojamientoConjunto',
        icon: HospitalBed,
        slotName: 'neonatal-alojamiento-conjunto-slot',
      },
      {
        labelKey: 'breastfeedingCounseling',
        icon: WatsonHealthCobbAngle,
        slotName: 'neonatal-counseling-slot',
      },
    ],
    [],
  );

  if (!patient || !patientUuid) {
    return null;
  }

  return (
    <TabbedDashboard
      patient={patient}
      patientUuid={patientUuid}
      titleKey="neonatalCare"
      tabs={tabs}
      ariaLabelKey="neonatalCareTabs"
    />
  );
};
