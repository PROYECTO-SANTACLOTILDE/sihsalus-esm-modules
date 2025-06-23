import { Button, ContentSwitcher, DataTableSkeleton, IconSwitch } from '@carbon/react';
import { Add, Analytics, Table } from '@carbon/react/icons';
import { getPatientName, isDesktop as isDesktopLayout, launchWorkspace, useLayoutType } from '@openmrs/esm-framework';
import {
  CardHeader,
  EmptyState,
  ErrorState,
  launchStartVisitPrompt,
  useVisitOrOfflineVisit,
} from '@openmrs/esm-patient-common-lib';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './growth-chart-overview.scss';
import GrowthChart from './growth-chart.component';
import { useBiometrics } from './hooks/useBiometrics';

interface GrowthChartProps {
  patient: fhir.Patient;
  patientUuid: string;
}

const GrowthChartOverview: React.FC<GrowthChartProps> = ({ patient, patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('growthChart', 'Growth Chart');
  const displayText = t('relatedData', 'related data');
  const formWorkspace = 'newborn-anthropometric-form';
  const { currentVisit } = useVisitOrOfflineVisit(patientUuid);

  // Estado para controlar el modo de visualización (percentiles vs z-scores)
  const [isPercentiles, setIsPercentiles] = useState(true);

  const layout = useLayoutType();
  const isDesktop = isDesktopLayout(layout);
  const isTablet = !isDesktop;

  const launchForm = useCallback(() => {
    if (!currentVisit) {
      launchStartVisitPrompt();
    } else {
      launchWorkspace(formWorkspace, { patientUuid });
    }
  }, [currentVisit, patientUuid]);

  const patientName = getPatientName(patient);

  const gender = useMemo(() => {
    const raw = patient?.gender?.toUpperCase?.();
    return raw === 'FEMALE' || raw === 'MALE' ? raw.charAt(0) : 'M';
  }, [patient]);

  const dateOfBirth = useMemo(() => new Date(patient?.birthDate ?? new Date()), [patient?.birthDate]);
  const { data, isLoading: isLoading, error } = useBiometrics(patientUuid);

  const handleViewChange = useCallback((evt: { name: string }) => {
    setIsPercentiles(evt.name === 'percentileView');
  }, []);

  if (isLoading && !data) {
    return <DataTableSkeleton role="progressbar" aria-label={t('loadingData', 'Loading data')} />;
  }

  if (error) {
    return <ErrorState error={error} headerTitle={headerTitle} />;
  }

  if (data?.length) {
    return (
      <div className={styles.widgetCard}>
        <CardHeader title={headerTitle}>
          <div className={styles.clinicalDataHeaderActionItems}>
            <ContentSwitcher
              onChange={handleViewChange}
              size={isTablet ? 'md' : 'sm'}
              aria-label={t('viewSelector', 'Select chart type')}
              selectedIndex={isPercentiles ? 0 : 1}
            >
              <IconSwitch name="percentileView" text={t('percentileView', 'Percentiles')}>
                <Analytics size={16} />
              </IconSwitch>
              <IconSwitch name="zScoreView" text={t('zScoreView', 'Z-Scores')}>
                <Table size={16} />
              </IconSwitch>
            </ContentSwitcher>
            <span className={styles.divider}>|</span>
            <Button kind="ghost" renderIcon={Add} iconDescription={t('addData', 'Add data')} onClick={launchForm}>
              {t('add', 'Add')}
            </Button>
          </div>
        </CardHeader>

        <GrowthChart
          measurementData={data}
          patientName={patientName}
          gender={gender}
          dateOfBirth={dateOfBirth}
          isPercentiles={isPercentiles} // Pasar el estado al componente GrowthChart
        />
      </div>
    );
  }

  return (
    <EmptyState
      displayText={displayText}
      headerTitle={headerTitle}
      launchForm={formWorkspace || launchForm ? launchForm : undefined}
    />
  );
};

export default GrowthChartOverview;
