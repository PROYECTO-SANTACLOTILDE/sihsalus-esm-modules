import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig, launchWorkspace } from '@openmrs/esm-framework';
import { useLatestValidEncounter } from '../../../../hooks/useLatestEncounter'; // Ajusta la ruta
import PatientSummaryTable from '../../../../ui/patient-summary-table/patient-summary-table.component'; // Ajusta la ruta
import type { ConfigObject } from '../../../../config-schema'; // Ajusta la ruta

interface PregnancyBirthProps {
  patientUuid: string;
}

const PregnancyBirthTable: React.FC<PregnancyBirthProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig() as ConfigObject;
  const headerTitle = t('pregnancyBirth', 'Datos del Embarazo y Parto');
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
        formUuid: config.formsList.pregnancyDetails, // Asegúrate de tener este formulario configurado
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
    // SECCIÓN EMBARAZO
    {
      id: 'pregnancyNumber',
      label: t('pregnancyNumber', 'Nº de Embarazo (Gravida)'),
      dataKey: 'ae27daee-d2f3-4df3-8e07-eff75c81872e',
      sectionTitle: t('pregnancy', 'EMBARAZO'),
    },
    {
      id: 'prenatalCareNumber',
      label: t('prenatalCareNumber', 'Nº de Atenciones Prenatales'),
      dataKey: '9156b8d5-e5d3-4c2b-b8fc-1faafeda8f6c',
    },
    {
      id: 'prenatalCareLocation',
      label: t('prenatalCareLocation', 'Lugar de Atenciones Prenatales'),
      dataKey: '52a2755e-7510-473e-96d9-4875d7435f8d',
    },

    // SECCIÓN PARTO
    {
      id: 'deliveryType',
      label: t('deliveryType', 'Condición del Parto'),
      dataKey: '899e0cc8-5f6a-4334-b51d-c559f71ea550',
      sectionTitle: t('delivery', 'PARTO'),
    },
    {
      id: 'deliveryLocation',
      label: t('deliveryLocation', 'Lugar del Parto'),
      dataKey: 'b4c79dec-245b-4d9f-ae52-2db757c4561a',
    },
    {
      id: 'deliveryAttendant',
      label: t('deliveryAttendant', 'Atendido Por'),
      dataKey: 'cff0f194-0a8c-4f2c-bbe4-35b356b23d24',
    },
  ];

  return (
    <PatientSummaryTable
      patientUuid={patientUuid}
      headerTitle={headerTitle}
      displayText={t('pregnancyBirth', 'Embarazo y Parto')}
      dataHook={dataHook}
      rowConfig={rowConfig}
      onFormLaunch={handleLaunchForm}
    />
  );
};

export default PregnancyBirthTable;
