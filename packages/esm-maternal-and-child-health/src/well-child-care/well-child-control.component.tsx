import React, { useMemo } from 'react';
import { Friendship, ReminderMedical } from '@carbon/react/icons';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';

interface WellChildControlProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const WellChildControl: React.FC<WellChildControlProps> = ({ patient, patientUuid }) => {
  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: 'following',
        icon: Friendship,
        slotName: 'cred-following-slot',
      },
      {
        labelKey: 'credControls',
        icon: Friendship,
        slotName: 'cred-schedule-slot',
      },
      {
        labelKey: 'nonCredControls',
        icon: ReminderMedical,
        slotName: 'non-cred-control-slot',
      },
      {
        labelKey: 'additionalServices',
        icon: ReminderMedical,
        slotName: 'additional-health-services-slot',
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
      titleKey="wellChildCare"
      tabs={tabs}
      ariaLabelKey="wellChildCareTabs"
    />
  );
};
