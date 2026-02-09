import { useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema';

interface SupplementItem {
  name: string;
  delivered: number;
  total: number;
  isComplete: boolean;
}

interface PrenatalSupplementationResult {
  supplements: SupplementItem[];
  overallPercentage: number;
  isLoading: boolean;
  error: any;
}

/**
 * Hook para suplementación prenatal según NTS 105-MINSA:
 * - Ácido fólico: 400 μg/día (desde antes de la concepción hasta semana 13)
 * - Sulfato ferroso: 60mg Fe elemental/día (desde semana 14)
 * - Calcio: 500mg/día (desde semana 20 hasta el parto)
 *
 * TODO: Conectar con obs de suplementación prenatal del servidor
 */
export function usePrenatalSupplementation(patientUuid: string): PrenatalSupplementationResult {
  const config = useConfig<ConfigObject>();

  // TODO: Implementar fetch real con concept UUIDs de suplementación

  return {
    supplements: [
      { name: 'Ácido Fólico', delivered: 0, total: 90, isComplete: false },
      { name: 'Sulfato Ferroso', delivered: 0, total: 180, isComplete: false },
      { name: 'Calcio', delivered: 0, total: 140, isComplete: false },
    ],
    overallPercentage: 0,
    isLoading: false,
    error: null,
  };
}

export default usePrenatalSupplementation;
