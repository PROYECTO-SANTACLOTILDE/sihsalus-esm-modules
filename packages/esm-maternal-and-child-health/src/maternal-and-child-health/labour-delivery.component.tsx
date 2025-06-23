import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Report, ChartMultitype } from '@carbon/react/icons';
import { BabyIcon } from '@openmrs/esm-framework';
import TabbedDashboard from '../ui/tabbed-dashboard/tabbed-dashboard.component';
import type { TabConfig } from '../ui/tabbed-dashboard/tabbed-dashboard.component';

export interface LabourDeliveryProps {
  patient: fhir.Patient | null;
  patientUuid: string | null;
}

export const LabourDelivery: React.FC<LabourDeliveryProps> = ({ patient, patientUuid }) => {
  const { t } = useTranslation();

  const tabs: TabConfig[] = useMemo(
    () => [
      {
        labelKey: t('summaryOfLaborAndPostpartum', 'Resumen del Parto y Puerperio'),
        icon: Report,
        slotName: 'labour-delivery-summary-slot',
      },
      {
        labelKey: t('deliveryOrAbortion', 'Partos y Abortos'),
        icon: BabyIcon,
        slotName: 'labour-delivery-delivery-abortion-slot',
      },
      {
        labelKey: t('partograph', 'Partograma'),
        icon: ChartMultitype,
        slotName: 'labour-delivery-partograph-slot',
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
      titleKey={t('labourAndDelivery', 'Parto y Puerperio')}
      tabs={tabs}
      ariaLabelKey={t('labourAndDeliveryTabs', 'Pestañas de Parto y Puerperio')}
    />
  );
};
