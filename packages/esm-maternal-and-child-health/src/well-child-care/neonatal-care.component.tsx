import {
  Activity,
  CloudMonitoring,
  HospitalBed,
  Stethoscope,
  UserFollow,
  WatsonHealthCobbAngle,
} from '@carbon/react/icons';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';

export interface NeonatalCareProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const NeonatalCare: React.FC<NeonatalCareProps> = ({ patient, patientUuid }) => {
  const { t } = useTranslation();

  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: t('newbornVitals', 'Signos Vitales del Recién Nacido'),
        icon: Activity,
        slotName: 'neonatal-vitals-slot',
      },
      {
        labelKey: t('perinatalRecord', 'Antecedentes Perinatales'),
        icon: UserFollow,
        slotName: 'neonatal-perinatal-slot',
      },
      {
        labelKey: t('immediateAttention', 'Atención Inmediata'),
        icon: CloudMonitoring,
        slotName: 'neonatal-attention-slot',
      },
      {
        labelKey: t('cephalocaudalEvaluation', 'Evaluación Cefalocaudal'),
        icon: Stethoscope,
        slotName: 'neonatal-evaluation-slot',
      },
      {
        labelKey: t('alojamientoConjunto', 'Alojamiento Conjunto'),
        icon: HospitalBed,
        slotName: 'neonatal-alojamiento-conjunto-slot',
      },
      {
        labelKey: t('breastfeedingCounseling', 'Consejeria de Lactancia Materna'),
        icon: WatsonHealthCobbAngle,
        slotName: 'neonatal-counseling-slot',
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
      titleKey={t('neonatalCare', 'Historia Neonatal')}
      tabs={tabs}
      ariaLabelKey={t('neonatalCareTabs', 'Pestañas de Atención Neonatal')}
    />
  );
};
