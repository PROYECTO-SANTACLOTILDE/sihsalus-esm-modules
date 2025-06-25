import { useConfig } from '@openmrs/esm-framework';
import { useLaunchWorkspaceRequiringVisit } from '@openmrs/esm-patient-common-lib';
import { useCallback } from 'react';
import { type ConfigObject } from '../config-schema';
import { type Form } from '../types';

/**
 * Custom hook for launching CRED forms with workspace functionality
 * Similar to useLaunchVitalsAndBiometricsForm but specific to CRED forms
 */
export function useLaunchCREDForm() {
  const config = useConfig<ConfigObject>();

  // Use the form entry workspace for CRED forms
  const launchCREDFormWorkspace = useLaunchWorkspaceRequiringVisit('patient-form-entry-workspace');

  const launchCREDForm = useCallback(
    (form: Form, encounterUuid: string = '') => {
      const workspaceProps = {
        workspaceTitle: form.display || form.name,
        formInfo: {
          formUuid: form.uuid,
          encounterUuid,
        },
        // Add mutation callback if needed
        mutateForm: () => {
          // This could be used to refresh data after form submission
          // Similar to invalidateCachedVitalsAndBiometrics from the example
        },
      };

      launchCREDFormWorkspace(workspaceProps);
    },
    [launchCREDFormWorkspace],
  );

  /**
   * Launch a specific CRED form by its UUID from config
   * @param formKey - The key from config.formsList (e.g., 'eedp2Months', 'tepsi')
   * @param encounterUuid - Optional encounter UUID for editing existing encounter
   */
  const launchCREDFormByKey = useCallback(
    (formKey: keyof ConfigObject['formsList'], encounterUuid: string = '') => {
      const formUuid = config.formsList[formKey];

      if (!formUuid) {
        console.warn(`Form UUID not found for key: ${formKey}`);
        return;
      }

      // Create a Form object from the config
      const form: Form = {
        uuid: formUuid,
        name: formKey,
        display: getFormDisplayName(formKey),
        version: '1.0',
        published: true,
        retired: false,
        resources: [],
        formCategory: 'CRED',
      };

      launchCREDForm(form, encounterUuid);
    },
    [config.formsList, launchCREDForm],
  );

  /**
   * Launch form for nutrition evaluation based on age
   */
  const launchNutritionEvaluation = useCallback(
    (patientAge: number, encounterUuid: string = '') => {
      const formKey = patientAge <= 5 ? 'childFeeding0to5' : 'childFeeding6to42';
      launchCREDFormByKey(formKey, encounterUuid);
    },
    [launchCREDFormByKey],
  );

  /**
   * Launch EEDP form based on age in months
   */
  const launchEEDPForm = useCallback(
    (ageInMonths: number, encounterUuid: string = '') => {
      let formKey: keyof ConfigObject['formsList'];

      if (ageInMonths <= 3) {
        formKey = 'eedp2Months';
      } else if (ageInMonths <= 6) {
        formKey = 'eedp5Months';
      } else if (ageInMonths <= 10) {
        formKey = 'eedp8Months';
      } else if (ageInMonths <= 14) {
        formKey = 'eedp12Months';
      } else if (ageInMonths <= 17) {
        formKey = 'eedp15Months';
      } else if (ageInMonths <= 20) {
        formKey = 'eedp18Months';
      } else if (ageInMonths <= 24) {
        formKey = 'eedp21Months';
      } else {
        // For children older than 24 months, use TEPSI
        formKey = 'tepsi';
      }

      launchCREDFormByKey(formKey, encounterUuid);
    },
    [launchCREDFormByKey],
  );

  return {
    launchCREDForm,
    launchCREDFormByKey,
    launchNutritionEvaluation,
    launchEEDPForm,
  };
}

/**
 * Get display name for form based on config key
 */
function getFormDisplayName(formKey: string): string {
  const displayNames: Record<string, string> = {
    // EEDP Forms
    eedp2Months: 'EEDP - 2 meses',
    eedp5Months: 'EEDP - 5 meses',
    eedp8Months: 'EEDP - 8 meses',
    eedp12Months: 'EEDP - 12 meses',
    eedp15Months: 'EEDP - 15 meses',
    eedp18Months: 'EEDP - 18 meses',
    eedp21Months: 'EEDP - 21 meses',
    tepsi: 'TEPSI',

    // Assessment Forms
    riskInterview0to30: 'Entrevista de Factores de Riesgo (0-30 meses)',
    childFeeding0to5: 'Evaluación de Alimentación (0-5 meses)',
    childFeeding6to42: 'Evaluación de Alimentación (6-42 meses)',
    childAbuseScreening: 'Tamizaje de Violencia y Maltrato Infantil',

    // Clinical Forms
    nursingAssessment: 'Valoración de Enfermería',
    medicalOrders: 'Órdenes Médicas',
    medicalProgressNote: 'Nota de Evolución Médica',
    epicrisis: 'Epicrisis',

    // Newborn Forms
    atencionImmediataNewborn: 'Atención Inmediata del Recién Nacido',
    breastfeedingObservation: 'Observación del Amamantamiento',
    newbornNeuroEval: 'Evaluación Céfalo-Caudal y Neurológico',
    roomingIn: 'Alojamiento Conjunto',
    birthDetails: 'Detalles de Nacimiento',
    pregnancyDetails: 'Embarazo y Parto',
  };

  return displayNames[formKey] || formKey;
}
