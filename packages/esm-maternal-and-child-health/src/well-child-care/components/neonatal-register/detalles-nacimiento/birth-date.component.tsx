import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig, launchWorkspace } from '@openmrs/esm-framework';
import { useLatestValidEncounter } from '../../../../hooks/useLatestEncounter'; // Ajusta la ruta
import PatientSummaryTable from '../../../../ui/patient-summary-table/patient-summary-table.component'; // Ajusta la ruta
import type { ConfigObject } from '../../../../config-schema';

interface BirthDataProps {
  patientUuid: string;
}

const BirthDataTable: React.FC<BirthDataProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig() as ConfigObject;
  const headerTitle = t('birthData', 'Datos del Nacimiento');
  const { encounter, isLoading, error, mutate } = useLatestValidEncounter(
    patientUuid,
    config.encounterTypes.antecedentesPerinatales, // Asegúrate de tener este tipo de encounter configurado
  );

  const obsData = React.useMemo(() => {
    if (!encounter?.obs) return {};
    return encounter.obs.reduce((acc, obs) => {
      acc[obs.concept.uuid] = obs.value;
      return acc;
    }, {});
  }, [encounter]);

  const handleLaunchForm = () => {
    launchWorkspace('patient-form-entry-workspace', {
      workspaceTitle: headerTitle,
      patientUuid,
      mutateForm: mutate, // Pasa mutate para refrescar después de guardar
      formInfo: {
        formUuid: config.formsList.birthDetails,
        encounterUuid: encounter?.uuid || '', // Usa el último si existe
      },
    });
  };

  const dataHook = () => {
    return {
      data: encounter ? [obsData] : [],
      isLoading,
      error,
      mutate,
    };
  };

  const rowConfig = [
    // Datos antropométricos al nacer
    {
      id: 'gestationalAge',
      label: t('gestationalAgeAtBorn', 'Edad Gestacional al Nacer'),
      dataKey: '2eb9b2c4-cd08-4e6f-a11f-e1e6dc3cb54f',
      unit: t('weeks', 'semanas'),
    },
    {
      id: 'birthWeight',
      label: t('birthWeight', 'Peso al Nacer'),
      dataKey: '5a7f6473-ce0b-4ae5-95e1-3cb93ffaae65',
      unit: t('kg', 'kg'),
    },
    {
      id: 'birthHeight',
      label: t('birthHeight', 'Talla al Nacer'),
      dataKey: 'bf82beb1-d3b8-400e-8160-90869cad8136',
      unit: t('cm', 'cm'),
    },
    {
      id: 'headCircumference',
      label: t('headCircumference', 'Perímetro Cefálico'),
      dataKey: 'c4d39248-c896-433a-bc69-e24d04b7f0e5',
      unit: t('cm', 'cm'),
    },
    {
      id: 'chestCircumference',
      label: t('chestCircumference', 'Perímetro Torácico'),
      dataKey: '911eb398-e7de-4270-af63-e4c615ec22a9',
      unit: t('cm', 'cm'),
    },
    {
      id: 'weightForGestationalAge',
      label: t('weightForGestationalAge', 'Peso para Edad Gestacional'),
      dataKey: 'b17dca04-fbf6-483f-bc95-951f17a233f7',
    },

    // Evaluaciones APGAR
    {
      id: 'apgar1',
      label: t('apgar1', 'APGAR 1 minuto'),
      dataKey: 'a2010a1f-d7ca-4d6f-9255-f53da4fa5c3f',
      unit: t('points', 'puntos'),
    },
    {
      id: 'apgar5',
      label: t('apgar5', 'APGAR 5 minutos'),
      dataKey: '0f3be2f6-986f-4928-8761-b531044c1f36',
      unit: t('points', 'puntos'),
    },

    // Condiciones médicas
    {
      id: 'congenitalDisease',
      label: t('congenitalDisease', 'Enfermedad Congénita'),
      dataKey: '1c3c6e76-5c02-4f7a-9ace-394973c2b223',
    },
    {
      id: 'skinToSkinContact',
      label: t('skinToSkinContact', 'Contacto Piel a Piel'),
      dataKey: '3bbebee4-ccc8-4a01-a5e8-14f9222a6827',
    },
    {
      id: 'roomingIn',
      label: t('roomingIn', 'Alojamiento Conjunto'),
      dataKey: '98360dd3-0000-4b58-a21c-fe0189302d1a',
    },
    {
      id: 'breastfeedingFirstHour',
      label: t('breastfeedingFirstHour', 'Lactancia Primera Hora'),
      dataKey: '82821bfe-a9f3-425e-9287-579ba4660832',
    },

    // Hospitalización
    {
      id: 'requiredHospitalization',
      label: t('requiredHospitalization', 'Requirió Hospitalización'),
      dataKey: '49011148-6906-4885-b0a8-da2a0f8fd24b',
    },
    {
      id: 'hospitalizationTime',
      label: t('hospitalizationTime', 'Tiempo de Hospitalización'),
      dataKey: '0b9dcf14-5acb-427b-a017-71794d320d22',
      unit: t('days', 'días'),
    },
  ];

  return (
    <PatientSummaryTable
      patientUuid={patientUuid}
      headerTitle={headerTitle}
      displayText={t('birthData', 'Datos del Nacimiento')}
      dataHook={dataHook}
      rowConfig={rowConfig}
      onFormLaunch={handleLaunchForm}
    />
  );
};

export default BirthDataTable;
