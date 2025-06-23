import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Eyedropper, Pills } from '@carbon/react/icons';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';

export interface ChildImmunizationProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const ChildImmunizationSchedule: React.FC<ChildImmunizationProps> = ({ patient, patientUuid }) => {
  const { t } = useTranslation();

  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: t('vaccinationSchedule', 'Calendario de Vacunación'),
        icon: Eyedropper,
        slotName: 'vaccination-schedule-slot',
      },
      {
        labelKey: t('adverseReactions', 'Reacciones Adversas'),
        icon: Pills,
        slotName: 'vaccination-appointment-slot',
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
      titleKey={t('childImmunizationSchedule', 'Esquema de Vacunación Infantil')}
      tabs={tabs}
      ariaLabelKey={t('immunizationTabs', 'Pestañas de Inmunización')}
    />
  );
};
