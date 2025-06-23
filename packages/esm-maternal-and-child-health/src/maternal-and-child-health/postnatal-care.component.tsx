import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Stethoscope } from '@carbon/react/icons';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';

export interface PostnatalCareProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const PostnatalCare: React.FC<PostnatalCareProps> = ({ patient, patientUuid }) => {
  const { t } = useTranslation();

  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: t('immediatePostpartum', 'Puerperio Inmediato'),
        icon: Activity,
        slotName: 'postnatal-care-immediate-slot',
      },
      {
        labelKey: t('postnatalControls', 'Control del Puerperio'),
        icon: Stethoscope,
        slotName: 'postnatal-care-controls-slot',
      },
    ],
    [t],
  );

  if (!patient || !patientUuid) {
    return null;
  }

  return (
    <TabbedDashboard
      patient={patient}
      patientUuid={patientUuid}
      titleKey={t('postnatalCare', 'Control Postnatal')}
      tabs={tabs}
      ariaLabelKey={t('postnatalCareTabs', 'Pestañas de Control Postnatal')}
    />
  );
};
