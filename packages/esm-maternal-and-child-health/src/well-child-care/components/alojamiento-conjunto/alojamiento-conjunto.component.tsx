import { launchWorkspace, useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ConfigObject } from '../../../config-schema';
import { useLatestValidEncounter } from '../../../hooks/useLatestEncounter';
import PatientSummaryTable from '../../../ui/patient-summary-table/patient-summary-table.component';

interface AlojamientoConjuntoProps {
  patientUuid: string;
}

const AlojamientoConjunto: React.FC<AlojamientoConjuntoProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig() as ConfigObject;
  const headerTitle = t('alojamientoConjunto', 'Alojamiento Conjunto');
  const { encounter, isLoading, error, mutate } = useLatestValidEncounter(
    patientUuid,
    config.encounterTypes.alojamientoConjunto,
  );

  const obsData = React.useMemo(() => {
    if (!encounter?.obs) return {};
    return encounter.obs.reduce((acc, obs) => {
      if (obs?.concept?.uuid && obs.value !== undefined) {
        acc[obs.concept.uuid] = obs.value;
      }
      return acc;
    }, {});
  }, [encounter]);

  const handleLaunchForm = React.useCallback(() => {
    if (!config.formsList?.roomingIn) {
      console.error('Form UUID not configured for roomingIn');
      return;
    }

    try {
      launchWorkspace('patient-form-entry-workspace', {
        workspaceTitle: headerTitle,
        patientUuid,
        mutateForm: mutate,
        formInfo: {
          formUuid: config.formsList.roomingIn,
          encounterUuid: encounter?.uuid || '',
        },
      });
    } catch (error) {
      console.error('Error launching workspace:', error);
    }
  }, [headerTitle, patientUuid, mutate, config.formsList.roomingIn, encounter?.uuid]);

  const dataHook = React.useCallback(() => {
    return {
      data: encounter ? [obsData] : [],
      isLoading,
      error,
      mutate,
    };
  }, [encounter, obsData, isLoading, error, mutate]);

  if (!patientUuid || typeof patientUuid !== 'string') {
    return <div>Error: UUID de paciente inválido</div>;
  }

  const rowConfig = [
    // Datos Generales
    {
      id: 'fechaYHoraDeIngreso',
      label: t('fechaYHoraDeIngreso', 'Fecha y hora de ingreso'),
      dataKey: '38d40f48-10cb-4d80-a269-ec00b0be0cd0',
    },
    {
      id: 'edadGestacional',
      label: t('edadGestacional', 'Edad Gestacional (semanas)'),
      dataKey: '2eb9b2c4-cd08-4e6f-a11f-e1e6dc3cb54f',
    },
    {
      id: 'hematocrito',
      label: t('hematocrito', 'Hematocrito (%)'),
      dataKey: '9a9c73d0-76e6-4b84-b20c-dfe8efea9542',
    },

    // Valoración de enfermería al ingreso - En la madre
    {
      id: 'edadDeLaMadre',
      label: t('edadDeLaMadre', 'Edad de la madre'),
      dataKey: 'dcc62b2c-2fc7-4053-9239-0e79335ecdbc',
    },
    {
      id: 'numeroDeHijos',
      label: t('numeroDeHijos', 'Número de hijos'),
      dataKey: '6cce201f-26eb-46d0-a8cb-f17ef045af78',
    },
    {
      id: 'tipoDeParto',
      label: t('tipoDeParto', 'Tipo de parto'),
      dataKey: '590f32e5-d78a-47c6-98fc-9e4ddb3e7ede',
    },
    {
      id: 'pezones',
      label: t('pezones', 'Pezones'),
      dataKey: '84f9275b-5a46-4c5c-96f6-e3752e0652ab',
    },
    {
      id: 'produccionLactea',
      label: t('produccionLactea', 'Producción Láctea'),
      dataKey: 'ed328efb-4ca4-475b-a610-05c142738e06',
    },

    // Valoración de enfermería al ingreso - En el recién nacido
    {
      id: 'agarre',
      label: t('agarre', 'Agarre'),
      dataKey: 'df387d42-759e-4968-9f84-731c0fa3a089',
    },
    {
      id: 'succion',
      label: t('succion', 'Succión'),
      dataKey: '8c68ada1-17b0-4c97-a521-6e7d3024b8fd',
    },
    {
      id: 'deglucion',
      label: t('deglucion', 'Deglución'),
      dataKey: '4f8eb241-0cb9-4c10-825a-61889a73c42f',
    },
    {
      id: 'diagnosticoDeEnfermeria',
      label: t('diagnosticoDeEnfermeria', 'Diagnóstico de Enfermería'),
      dataKey: 'c20d1f4e-d19a-47b6-b545-181a85477187',
    },
    {
      id: 'intervencionDeEnfermeria',
      label: t('intervencionDeEnfermeria', 'Intervención de enfermería'),
      dataKey: '47a5ae3a-36a8-422c-a0b0-9b18bb44655f',
    },
  ];

  return (
    <PatientSummaryTable
      patientUuid={patientUuid}
      headerTitle={headerTitle}
      displayText={t('alojamientoConjunto', 'Alojamiento Conjunto')}
      dataHook={dataHook}
      rowConfig={rowConfig}
      onFormLaunch={handleLaunchForm}
    />
  );
};

export default AlojamientoConjunto;
