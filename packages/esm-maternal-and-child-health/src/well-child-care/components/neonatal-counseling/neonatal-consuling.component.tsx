import { launchWorkspace, useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ConfigObject } from '../../../config-schema';
import { useLatestValidEncounter } from '../../../hooks/useLatestEncounter'; // Ajusta la ruta
import PatientSummaryTable from '../../../ui/patient-summary-table/patient-summary-table.component'; // Ajusta la ruta

// UUID del encounterType del formulario "Consejeria Lactancia Materna"
export const neonatalCounselingEncounterTypeUuid = '3w4x5y6z-3234-5678-9101-abcdefghij23';

interface NeonatalCounselingProps {
  patientUuid: string;
}

const NeonatalCounseling: React.FC<NeonatalCounselingProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig() as ConfigObject;
  const headerTitle = t('neonatalCounseling', 'Consejeria Lactancia Materna');
  const { encounter, isLoading, error, mutate } = useLatestValidEncounter(
    patientUuid,
    neonatalCounselingEncounterTypeUuid,
  );

  // Procesar observaciones, manejando múltiples valores para checkboxes
  const obsData = React.useMemo(() => {
    if (!encounter?.obs) return {};
    const obsMap: { [key: string]: string | string[] } = {};
    encounter.obs.forEach((obs) => {
      const conceptUuid = obs.concept.uuid;
      const value =
        obs.value && typeof obs.value === 'object' && 'display' in obs.value ? obs.value.display : obs.value;
      if (obsMap[conceptUuid]) {
        // Si ya existe, convertir a array para checkboxes
        obsMap[conceptUuid] = Array.isArray(obsMap[conceptUuid])
          ? [...obsMap[conceptUuid], value]
          : [obsMap[conceptUuid], value];
      } else {
        obsMap[conceptUuid] = value;
      }
    });
    return obsMap;
  }, [encounter]);

  const handleLaunchForm = () => {
    launchWorkspace('patient-form-entry-workspace', {
      workspaceTitle: headerTitle,
      patientUuid,
      mutateForm: mutate,
      formInfo: {
        formUuid: config.formsList.breastfeedingObservation,
        encounterUuid: encounter?.uuid || '',
      },
    });
    setTimeout(() => mutate(), 1000); // Forzar revalidación
  };

  const dataHook = () => ({
    data: encounter ? [obsData] : [],
    isLoading,
    error,
    mutate,
  });

  const rowConfig = [
    {
      id: 'examDate',
      label: t('examDate', 'Fecha y Hora de Inicio del Examen'),
      dataKey: '8b88b123-a28f-4d70-a86d-49fd322c46d5',
    },
    {
      id: 'bodyPosition',
      label: t('bodyPosition', 'Posición del Cuerpo'),
      dataKey: 'a2fa14e7-cf20-494c-ae55-6d1a0d01171c',
    },
    { id: 'responses', label: t('responses', 'Respuestas'), dataKey: '08aeaea7-6fb4-4346-9834-d137e8a9a503' },
    {
      id: 'affectiveBond',
      label: t('affectiveBond', 'Vínculo Afectivo'),
      dataKey: '60c8d705-ed11-43f2-a9fe-85036fead073',
    },
    { id: 'anatomy', label: t('anatomy', 'Anatomía'), dataKey: '8be83572-62bc-47cf-8691-f04fdc33a882' },
    { id: 'suction', label: t('suction', 'Succión'), dataKey: 'a4c047c9-30f8-49f6-8fb9-43e15e91d18c' },
    { id: 'time', label: t('time', 'Tiempo'), dataKey: 'dfe757a2-b7c6-4081-a151-2d8a58e80115' },
    {
      id: 'feedingTime',
      label: t('feedingTime', 'Tiempo que el Bebé Mamó (min)'),
      dataKey: '4cb55646-934c-44f5-a986-166654b44996',
    },
    { id: 'notes', label: t('notes', 'Notas'), dataKey: 'f947a4ad-3d8d-4516-8e6b-67b3dca4e227' },
  ];

  return (
    <PatientSummaryTable
      patientUuid={patientUuid}
      headerTitle={headerTitle}
      displayText={t('neonatalCounseling', 'Consejeria Lactancia Materna')}
      dataHook={dataHook}
      rowConfig={rowConfig}
      onFormLaunch={handleLaunchForm}
    />
  );
};

export default NeonatalCounseling;
