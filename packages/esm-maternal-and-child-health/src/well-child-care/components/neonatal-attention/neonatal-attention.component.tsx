import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig, launchWorkspace } from '@openmrs/esm-framework';
import { useLatestValidEncounter } from '../../../hooks/useLatestEncounter'; // Ajusta la ruta
import PatientSummaryTable from '../../../ui/patient-summary-table/patient-summary-table.component'; // Ajusta la ruta
import type { ConfigObject } from '../../../config-schema';

// UUID del encounterType del formulario "Atención Inmediata del Recién Nacido"
export const immediateNewbornAttentionEncounterTypeUuid = '3w4x5y6z-3234-5678-9101-abcdefghij23';

interface ImmediateNewbornAttentionProps {
  patientUuid: string;
}

const NeonatalAttention: React.FC<ImmediateNewbornAttentionProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig() as ConfigObject;
  const headerTitle = t('immediateNewbornAttention', 'Atención Inmediata del Recién Nacido');
  const displayText = t('immediateNewbornAttention', 'Atención Inmediata del Recién Nacido');
  const { encounter, isLoading, error, mutate } = useLatestValidEncounter(
    patientUuid,
    immediateNewbornAttentionEncounterTypeUuid,
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
        formUuid: config.formsList.atencionImmediataNewborn,
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
      id: 'immediateAssessment',
      label: t('immediateAssessment', 'Valoración Inmediata del Recién Nacido'),
      dataKey: '7dbb1546-3eef-4983-99ad-4c7f065cf093',
    },
    {
      id: 'birthQuestionnaire',
      label: t('birthQuestionnaire', 'Cuestionario Inmediato para Nacimiento'),
      dataKey: '517afc20-481d-4cdf-ba88-5641418aa762',
    },
    {
      id: 'newbornEvaluation',
      label: t('newbornEvaluation', 'Evaluación del Recién Nacido'),
      dataKey: 'ebe4e1c4-7f4f-4779-a8b3-8b2e5a5cc9b6',
    },
    { id: 'cordClamping', label: t('cordClamping', 'Clampado'), dataKey: 'b7f5376f-b025-4da5-80e2-bb20065a1b30' },
    {
      id: 'skinToSkinContact',
      label: t('skinToSkinContact', 'Contacto Piel a Piel'),
      dataKey: '3bbebee4-ccc8-4a01-a5e8-14f9222a6827',
    },
    {
      id: 'oxygenSupport',
      label: t('oxygenSupport', 'Soporte de Oxígeno'),
      dataKey: '06e7e25f-23c5-4035-800a-d86f598d50cf',
    },
    {
      id: 'vitaminKAdmin',
      label: t('vitaminKAdmin', 'Administración de Vitamina K'),
      dataKey: '5da8b9b1-f566-411f-b50b-f634ed6321c0',
    },
    { id: 'heartRate', label: t('heartRate', 'Frecuencia Cardíaca'), dataKey: 'c6f1da2a-0163-407c-9fe1-649fc2dca5a4' },
    {
      id: 'respiratoryRate',
      label: t('respiratoryRate', 'Frecuencia Respiratoria'),
      dataKey: 'aeecf295-048b-4c40-a6a0-c3a7db169466',
    },
    {
      id: 'oxygenSaturation',
      label: t('oxygenSaturation', 'Saturación de Oxígeno'),
      dataKey: '4dc51434-3f62-483c-b4db-441eae51f0a3',
    },
    {
      id: 'bodyTemperature',
      label: t('bodyTemperature', 'Temperatura Corporal'),
      dataKey: '89c9c0bf-e746-4f8d-8d04-b2d2ad9826eb',
    },
    { id: 'apgar1Min', label: t('apgar1Min', 'Apgar 1 Minuto'), dataKey: 'a2010a1f-d7ca-4d6f-9255-f53da4fa5c3f' },
    { id: 'apgar5Min', label: t('apgar5Min', 'Apgar 5 Minutos'), dataKey: '0f3be2f6-986f-4928-8761-b531044c1f36' },
    {
      id: 'apgar10Min',
      label: t('apgar10Min', 'Apgar 10 Minutos'),
      dataKey: 'f621e8d3-2c34-48fc-95c1-50ad0606ed68',
    },
    { id: 'weight', label: t('weight', 'Peso (Kg)'), dataKey: '5cacede4-c947-4092-9df4-24287a7f13ae' },
    { id: 'height', label: t('height', 'Talla (cm)'), dataKey: '3f85a289-bcb4-4d67-8053-7c8415e09aef' },
    {
      id: 'headCircumference',
      label: t('headCircumference', 'Perímetro Cefálico (cm)'),
      dataKey: 'c4d39248-c896-433a-bc69-e24d04b7f0e5',
    },
    {
      id: 'chestCircumference',
      label: t('chestCircumference', 'Perímetro Torácico (cm)'),
      dataKey: '911eb398-e7de-4270-af63-e4c615ec22a9',
    },
    {
      id: 'gastricLavage',
      label: t('gastricLavage', 'Lavado Gástrico'),
      dataKey: '0d17ad63-b1c0-46db-b8e7-c4c2d8343edf',
    },
    {
      id: 'gastricLavageCount',
      label: t('gastricLavageCount', 'Cantidad de Lavados Gástricos'),
      dataKey: '1c2e66e6-1a67-488c-a36b-e2f3536b72fe',
    },
    {
      id: 'nursingDiagnosis',
      label: t('nursingDiagnosis', 'Diagnóstico de Enfermería'),
      dataKey: '8e779adc-c463-434a-9113-a74c5e12399d',
    },
  ];

  return (
    <PatientSummaryTable
      patientUuid={patientUuid}
      headerTitle={headerTitle}
      displayText={displayText}
      dataHook={dataHook}
      rowConfig={rowConfig}
      onFormLaunch={handleLaunchForm}
    />
  );
};

export default NeonatalAttention;
