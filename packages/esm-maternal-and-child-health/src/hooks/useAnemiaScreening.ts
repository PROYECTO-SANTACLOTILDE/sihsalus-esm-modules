import useSWR from 'swr';
import { openmrsFetch, useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema';

interface AnemiaScreeningResult {
  lastHb: number | null;
  lastDate: string | null;
  isAnemic: boolean;
  nextDueDate: string | null;
  isLoading: boolean;
  error: any;
}

/**
 * Hook para tamizaje de anemia según NTS 137 (mod. RM 643-2018/MINSA):
 * - Primer dosaje de Hb a los 6 meses
 * - Frecuencia semestral hasta los 2 años
 * - Frecuencia anual a partir de los 2 años
 * - Anemia: Hb < 11 g/dL
 *
 * TODO: Conectar con concept UUID de hemoglobina del servidor
 */
export function useAnemiaScreening(patientUuid: string): AnemiaScreeningResult {
  const config = useConfig<ConfigObject>();

  // TODO: Implementar fetch real cuando se tenga el concept UUID de hemoglobina
  // const hemoglobinaConceptUuid = config.anemiaScreening?.hemoglobinaConceptUuid;

  return {
    lastHb: null,
    lastDate: null,
    isAnemic: false,
    nextDueDate: null,
    isLoading: false,
    error: null,
  };
}

export default useAnemiaScreening;
