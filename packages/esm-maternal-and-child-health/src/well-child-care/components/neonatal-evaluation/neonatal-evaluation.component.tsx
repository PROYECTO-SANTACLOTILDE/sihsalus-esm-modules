import { launchWorkspace, useConfig } from '@openmrs/esm-framework';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ConfigObject } from '../../../config-schema'; // Ajusta la ruta
import { useLatestValidEncounter } from '../../../hooks/useLatestEncounter'; // Ajusta la ruta
import PatientSummaryTable from '../../../ui/patient-summary-table/patient-summary-table.component'; // Ajusta la ruta

interface CephaloCaudalNeurologicalEvaluationProps {
  patientUuid: string;
}

const CephaloCaudalNeurologicalEvaluationTable: React.FC<CephaloCaudalNeurologicalEvaluationProps> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const config = useConfig() as ConfigObject;
  const headerTitle = t(
    'cephaloCaudalNeurologicalEvaluation',
    'Evaluación Céfalocaudal y Neurológica del Recién Nacido',
  );
  const { encounter, isLoading, error, mutate } = useLatestValidEncounter(
    patientUuid,
    config.encounterTypes.cefaloCaudal,
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
        formUuid: config.formsList.newbornNeuroEval,
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
    { id: 'skinColor', label: t('skinColor', 'Color de Piel'), dataKey: 'c00971b1-029f-4160-9b68-55e101a512a8' },
    { id: 'fontanelle', label: t('fontanelle', 'Fontanela'), dataKey: '52956c82-e8ad-4f85-8dd7-9b993f3d54df' },
    { id: 'sutures', label: t('sutures', 'Suturas'), dataKey: 'dde87a4f-cd8c-4fe7-b7ef-f0f43bb31637' },
    { id: 'ears', label: t('ears', 'Orejas'), dataKey: '4b4f8ad4-a934-4ead-921a-266ca1d2102c' },
    { id: 'nose', label: t('nose', 'Nariz'), dataKey: '313226d7-d67d-4246-8d84-62f7208badf5' },
    { id: 'mouth', label: t('mouth', 'Boca'), dataKey: '1a512c73-916f-4df3-938d-6f2c3d705fc3' },
    { id: 'neck', label: t('neck', 'Cuello'), dataKey: '7978016d-a854-427b-8451-9f6ca62b5186' },
    { id: 'thorax', label: t('thorax', 'Tórax'), dataKey: '08579338-2599-438e-b3be-6cd3e7d955bd' },
    { id: 'nipples', label: t('nipples', 'Mamilas'), dataKey: '36094aaf-31f7-46e8-92f1-8e8f7b7181ec' },
    { id: 'clavicle', label: t('clavicle', 'Clavícula'), dataKey: '3d81681d-081e-4c31-ad24-d5faea4c2833' },
    {
      id: 'esophagus',
      label: t('esophagus', 'Permeabilidad Esófago'),
      dataKey: 'f49edae8-ea0c-4013-8452-4dde09d7f8a7',
    },
    {
      id: 'umbilicalCord',
      label: t('umbilicalCord', 'Cordón Umbilical'),
      dataKey: '7f75f2a9-3531-4f9a-b2ac-eaf61d74f614',
    },
    {
      id: 'abdomenCharacteristics',
      label: t('abdomenCharacteristics', 'Características del Abdomen'),
      dataKey: '49d05fba-f1d0-4bb7-8b63-5084d78638e2',
    },
    {
      id: 'genitourinary',
      label: t('genitourinary', 'Genito Urinario'),
      dataKey: '57746a04-5f9e-4e42-9233-efeeeb3db0d0',
    },
    { id: 'observation', label: t('observation', 'Observación'), dataKey: 'f947a4ad-3d8d-4516-8e6b-67b3dca4e227' },
    {
      id: 'analPermeability',
      label: t('analPermeability', 'Permeabilidad Anal'),
      dataKey: 'f49edae8-ea0c-4013-8452-4dde09d7f8a7',
    },
    {
      id: 'genitourinaryElimination',
      label: t('genitourinaryElimination', 'Eliminación Genito Urinario'),
      dataKey: 'd79f07ac-bc26-4e3d-84d2-fb764da9409b',
    },
    {
      id: 'spinalColumn',
      label: t('spinalColumn', 'Columna Vertebral'),
      dataKey: 'd5d244f7-911b-43ca-90a1-3001c167b342',
    },
    { id: 'limbs', label: t('limbs', 'Extremidades'), dataKey: '46dc8706-c1af-4b04-b5d8-7432de862fef' },
    { id: 'muscleTone', label: t('muscleTone', 'Tono Muscular'), dataKey: '0d73ab1a-faee-4774-b570-609d98d8f6e0' },
    { id: 'hip', label: t('hip', 'Cadera'), dataKey: 'ca9f422f-f103-43c4-ae56-1b43bc2e7ec1' },
    {
      id: 'neurologicalEvaluation',
      label: t('neurologicalEvaluation', 'Valoración Neurológica'),
      dataKey: '7378ae3c-4a25-4d09-adbc-b3fe6b739aa3',
    },
  ];

  return (
    <PatientSummaryTable
      patientUuid={patientUuid}
      headerTitle={headerTitle}
      displayText={t('cephaloCaudalNeurologicalEvaluation', 'Céfalo Caudal y Neurológica')}
      dataHook={dataHook}
      rowConfig={rowConfig}
      onFormLaunch={handleLaunchForm}
    />
  );
};

export default CephaloCaudalNeurologicalEvaluationTable;
