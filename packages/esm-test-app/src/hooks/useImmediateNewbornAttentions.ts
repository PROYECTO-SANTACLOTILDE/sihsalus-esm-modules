import useSWR from 'swr';
import type { Encounter, Observation } from '../ui/encounter-list/encounter.resource';
import { openmrsFetch, restBaseUrl, useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema'; // Adjust the import path as needed
import { encounterRepresentation } from '../utils/constants'; // Adjust the import path as needed

export const immediateNewbornEncounterUuid = '58a87b85-cb6c-4a4c-bc5f-0a2d1e0ff8ba'; // Define as a constant (replace with actual UUID or config value)

export function useImmediateNewbornAttentions(patientUuid: string) {
  const config = useConfig() as ConfigObject;
  const url = `${restBaseUrl}/encounter?patient=${patientUuid}&encounterType=${config.encounterTypes?.prenatalControl || immediateNewbornEncounterUuid}&v=${encounterRepresentation}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR<{ data: { results: Array<Encounter> } }, Error>(
    url,
    openmrsFetch,
  );

  return {
    newbornEncounters: data?.data?.results || [],
    isLoading,
    isValidating,
    error,
    mutate,
  };
}
