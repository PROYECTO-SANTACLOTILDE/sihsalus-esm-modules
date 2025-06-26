import useSWR from 'swr';
import type { Encounter } from '../ui/encounter-list/encounter.resource';
import { openmrsFetch, restBaseUrl, useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema'; // Adjust the import path as needed
import { encounterRepresentation } from '../utils/constants'; // Adjust the import path as needed

export const cephaloCaudalNeurologicalEvaluationEncounterUuid = '2v3w4x5y-2234-5678-9101-abcdefghij22'; // Encounter type UUID from JSON

export function useCephaloCaudalNeurologicalEvaluation(patientUuid: string) {
  const config = useConfig() as ConfigObject;
  const url = `${restBaseUrl}/encounter?patient=${patientUuid}&encounterType=${config.encounterTypes.postnatalControl || cephaloCaudalNeurologicalEvaluationEncounterUuid}&v=${encounterRepresentation}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR<{ data: { results: Array<Encounter> } }, Error>(
    url,
    openmrsFetch,
  );

  return {
    encounters: data?.data?.results || [],
    isLoading,
    isValidating,
    error,
    mutate,
  };
}
