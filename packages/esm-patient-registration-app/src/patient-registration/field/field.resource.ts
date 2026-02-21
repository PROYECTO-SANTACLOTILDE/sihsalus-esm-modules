import { type FetchResponse, openmrsFetch, restBaseUrl, showSnackbar } from '@openmrs/esm-framework';
import useSWRImmutable from 'swr/immutable';
import { type ConceptAnswers, type ConceptResponse } from '../patient-registration.types';
import { useMemo } from 'react';

export function useConcept(conceptUuid: string): { data: ConceptResponse; isLoading: boolean; mutate: () => void } {
  const shouldFetch = typeof conceptUuid === 'string' && conceptUuid !== '';
  const { data, error, isLoading, mutate } = useSWRImmutable<FetchResponse<ConceptResponse>, Error>(
    shouldFetch ? `${restBaseUrl}/concept/${conceptUuid}` : null,
    openmrsFetch,
  );
  if (error) {
    showSnackbar({
      title: error.name,
      subtitle: error.message,
      kind: 'error',
    });
  }
  const results = useMemo(() => ({ data: data?.data, isLoading, mutate }), [data, isLoading, mutate]);
  return results;
}

export function useConceptAnswers(conceptUuid: string): {
  data: Array<ConceptAnswers>;
  isLoading: boolean;
  error: Error;
  mutate: () => void;
} {
  const shouldFetch = typeof conceptUuid === 'string' && conceptUuid !== '';
  const { data, error, isLoading, mutate } = useSWRImmutable<FetchResponse<ConceptResponse>, Error>(
    shouldFetch ? `${restBaseUrl}/concept/${conceptUuid}` : null,
    openmrsFetch,
  );
  if (error) {
    showSnackbar({
      title: error.name,
      subtitle: error.message,
      kind: 'error',
    });
  }
  const results = useMemo(() => ({ data: data?.data?.answers, isLoading, error, mutate }), [isLoading, error, data, mutate]);
  return results;
}
