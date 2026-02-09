import useSWR from 'swr';
import { openmrsFetch, restBaseUrl, useConfig } from '@openmrs/esm-framework';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { ConfigObject } from '../config-schema';

interface BirthPlanResult {
  hasBirthPlan: boolean;
  planDate: string | null;
  transportArranged: boolean;
  referenceHospital: string | null;
  encounterUuid: string | null;
  isLoading: boolean;
  error: any;
  mutate: () => void;
}

/**
 * Hook para plan de parto según NTS 105-MINSA:
 * - Toda gestante debe tener plan de parto a partir de la semana 32
 * - Incluye: transporte, acompañante, referencia, fondo de emergencia
 * - Form Ampath: formsList.birthPlanForm (OBST-004-FICHA PLAN DE PARTO)
 * - Encounter type: config.birthPlan.encounterTypeUuid
 *
 * Usa: config.birthPlan.encounterTypeUuid para buscar encounters existentes
 */
export function useBirthPlan(patientUuid: string): BirthPlanResult {
  const config = useConfig<ConfigObject>();
  const encounterTypeUuid = config.birthPlan?.encounterTypeUuid;

  const url = useMemo(() => {
    if (!patientUuid || !encounterTypeUuid) return null;
    return `${restBaseUrl}/encounter?patient=${patientUuid}&encounterType=${encounterTypeUuid}&v=custom:(uuid,encounterDatetime,obs:(uuid,display,value:(uuid,display)))&limit=1&order=desc`;
  }, [patientUuid, encounterTypeUuid]);

  const { data, isLoading, error, mutate } = useSWR(
    url,
    async (fetchUrl: string) => {
      const response = await openmrsFetch(fetchUrl);
      return response?.data;
    },
  );

  const result = useMemo(() => {
    const encounter = data?.results?.[0];
    if (!encounter) {
      return {
        hasBirthPlan: false,
        planDate: null,
        transportArranged: false,
        referenceHospital: null,
        encounterUuid: null,
      };
    }

    return {
      hasBirthPlan: true,
      planDate: encounter.encounterDatetime ? dayjs(encounter.encounterDatetime).format('DD/MM/YYYY') : null,
      transportArranged: false, // TODO: parse from obs when transport concept UUID is available
      referenceHospital: null, // TODO: parse from obs when reference hospital concept UUID is available
      encounterUuid: encounter.uuid,
    };
  }, [data]);

  return {
    ...result,
    isLoading,
    error,
    mutate,
  };
}

export default useBirthPlan;
