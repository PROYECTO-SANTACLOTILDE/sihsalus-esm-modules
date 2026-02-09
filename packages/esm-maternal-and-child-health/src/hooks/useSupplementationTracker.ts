import { useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema';

interface SupplementationResult {
  delivered: number;
  total: number;
  percentage: number;
  isComplete: boolean;
  isLoading: boolean;
  error: any;
}

/**
 * Hook para tracking de suplementación con MMN según Directiva 068-MINSA:
 * - 360 sobres de multimicronutrientes (MMN) en polvo
 * - 1 sobre diario desde los 6 meses hasta completar 360
 * - También trackea sulfato ferroso gotas (4-5 meses)
 *
 * TODO: Conectar con concept UUID de MMN entregados del servidor
 */
export function useSupplementationTracker(patientUuid: string): SupplementationResult {
  const config = useConfig<ConfigObject>();

  // TODO: Implementar fetch real cuando se tenga el concept UUID
  // const mmnConceptUuid = config.supplementation?.mmnConceptUuid;

  return {
    delivered: 0,
    total: 360,
    percentage: 0,
    isComplete: false,
    isLoading: false,
    error: null,
  };
}

export default useSupplementationTracker;
