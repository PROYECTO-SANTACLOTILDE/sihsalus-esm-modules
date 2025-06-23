import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UserFollow, Task, ChartLineData } from '@carbon/react/icons';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';

export interface PrenatalCareProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const PrenatalCare: React.FC<PrenatalCareProps> = ({ patient, patientUuid }) => {
  const { t } = useTranslation();

  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: t('maternalHistory', 'Historia Materna'),
        icon: UserFollow,
        slotName: 'prenatal-maternal-history-slot',
      },
      {
        labelKey: t('currentPregnancy', 'Embarazo Actual'),
        icon: Task,
        slotName: 'prenatal-current-pregnancy-slot',
      },
      {
        labelKey: t('prenatalCareChart', 'Control Prenatal'),
        icon: ChartLineData,
        slotName: 'prenatal-care-chart-slot',
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
      titleKey={t('prenatalCare', 'Control Prenatal')}
      tabs={tabs}
      ariaLabelKey={t('prenatalCareTabs', 'Pestañas de Control Prenatal')}
    />
  );
};
