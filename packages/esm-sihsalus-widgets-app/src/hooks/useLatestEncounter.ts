import useSWR, { type KeyedMutator } from 'swr';
import { openmrsFetch, restBaseUrl, type FetchResponse } from '@openmrs/esm-framework';
import pickBy from 'lodash/pickBy';
import type { OpenmrsEncounter } from '../types';

const latestEncounterRepresentation =
  'custom:(uuid,encounterDatetime,encounterType:(uuid,display),location:(uuid,display),patient:(uuid,display),' +
  'obs:(uuid,obsDatetime,concept:(uuid,display),value:(uuid,display,name:(uuid,name)),groupMembers:(uuid,concept:(uuid,display),value:(uuid,display))),form:(uuid,name))';

interface UseLatestEncounterResponse {
  encounter: OpenmrsEncounter | undefined;
  isLoading: boolean;
  error: Error | null;
  mutate: KeyedMutator<FetchResponse<{ results: OpenmrsEncounter[] }>>;
}

export const useLatestValidEncounter = (patientUuid: string, encounterTypeUuid: string): UseLatestEncounterResponse => {
  const params = new URLSearchParams(
    pickBy(
      {
        patient: patientUuid,
        encounterType: encounterTypeUuid,
        v: latestEncounterRepresentation,
        _sort: '-encounterDatetime',
        _count: '1',
      },
      (value) => value,
    ),
  );

  // Define the URL only if both parameters are valid, otherwise null
  const url = patientUuid && encounterTypeUuid ? `${restBaseUrl}/encounter?${params.toString()}` : null;

  // Always call useSWR, but with a key that may be null
  const {
    data,
    isLoading,
    error: swrError,
    mutate,
  } = useSWR<FetchResponse<{ results: OpenmrsEncounter[] }>, Error>(
    url,
    async (url) => {
      const response = await openmrsFetch(url);
      return response;
    },
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
    },
  );

  // Set final error: custom error if URL is null, otherwise use SWR error (or null if undefined)
  const finalError = !url ? new Error('patientUuid and encounterTypeUuid are required') : swrError || null;

  return {
    encounter: data?.data?.results?.[0],
    isLoading,
    error: finalError,
    mutate,
  };
};
