import { useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema';

type RiskLevel = 'bajo' | 'alto' | 'muy-alto' | 'indeterminado';

interface ObstetricRiskResult {
  riskLevel: RiskLevel;
  riskFactors: string[];
  lastEvaluationDate: string | null;
  isLoading: boolean;
  error: any;
}

/**
 * Hook para clasificación de riesgo obstétrico según NTS 105-MINSA:
 * - Bajo riesgo: sin factores de riesgo identificados
 * - Alto riesgo: uno o más factores (edad <15 o >35, antecedentes, etc.)
 * - Muy alto riesgo: preeclampsia, hemorragia, etc.
 *
 * Usa concept set: riskAntecedentsConceptSetUuid
 *
 * TODO: Conectar con el concept set de riesgo obstétrico del servidor
 */
export function useObstetricRisk(patientUuid: string): ObstetricRiskResult {
  const config = useConfig<ConfigObject>();

  // TODO: Implementar fetch real usando madreGestante.riskAntecedentsConceptSetUuid
  // const riskConceptSetUuid = config.madreGestante?.riskAntecedentsConceptSetUuid;

  return {
    riskLevel: 'indeterminado',
    riskFactors: [],
    lastEvaluationDate: null,
    isLoading: false,
    error: null,
  };
}

export default useObstetricRisk;
