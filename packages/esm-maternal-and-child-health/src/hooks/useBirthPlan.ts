import { useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema';

interface BirthPlanResult {
  hasBirthPlan: boolean;
  planDate: string | null;
  transportArranged: boolean;
  referenceHospital: string | null;
  isLoading: boolean;
  error: any;
}

/**
 * Hook para plan de parto según NTS 105-MINSA:
 * - Toda gestante debe tener plan de parto a partir de la semana 32
 * - Incluye: transporte, acompañante, referencia, fondo de emergencia
 * - Form UUID: birthPlanForm (OBST-004-FICHA PLAN DE PARTO)
 *
 * TODO: Conectar con encounter de plan de parto del servidor
 */
export function useBirthPlan(patientUuid: string): BirthPlanResult {
  const config = useConfig<ConfigObject>();

  // TODO: Implementar fetch real usando formsList.birthPlanForm
  // const birthPlanFormUuid = config.formsList?.birthPlanForm;

  return {
    hasBirthPlan: false,
    planDate: null,
    transportArranged: false,
    referenceHospital: null,
    isLoading: false,
    error: null,
  };
}

export default useBirthPlan;
