import { useMemo } from 'react';
import { type FetchResponse, fhirBaseUrl, openmrsFetch, useDebounce } from '@openmrs/esm-framework';
import { type LocationEntry, type LocationResponse } from '@openmrs/esm-service-queues-app/src/types';
import useSWR from 'swr';

interface UseLocationsResult {
  locations: Array<LocationEntry>;
  isLoading: boolean;
  loadingNewData: boolean;
}

export function useLocations(locationTag: string | null, searchQuery: string = ''): UseLocationsResult {
  // Optimización: Debounce más agresivo para búsquedas
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const constructUrl = useMemo(() => {
    let url = `${fhirBaseUrl}/Location?`;
    let urlSearchParameters = new URLSearchParams();
    urlSearchParameters.append('_summary', 'data');

    // Optimización: Limitar siempre los resultados
    if (!debouncedSearchQuery || debouncedSearchQuery.length < 2) {
      urlSearchParameters.append('_count', '10');
    } else {
      urlSearchParameters.append('_count', '20'); // Máximo 20 resultados en búsquedas
    }

    if (locationTag) {
      urlSearchParameters.append('_tag', locationTag);
    }

    // Solo buscar si hay al menos 2 caracteres
    if (typeof debouncedSearchQuery === 'string' && debouncedSearchQuery.length >= 2) {
      urlSearchParameters.append('name:contains', debouncedSearchQuery);
    }

    return url + urlSearchParameters.toString();
  }, [locationTag, debouncedSearchQuery]);

  const { data, error, isLoading, isValidating } = useSWR<FetchResponse<LocationResponse>, Error>(
    constructUrl,
    openmrsFetch,
  );

  return useMemo(
    () => ({
      locations: data?.data?.entry || [],
      isLoading,
      loadingNewData: isValidating,
    }),
    [data, isLoading, isValidating],
  );
}
