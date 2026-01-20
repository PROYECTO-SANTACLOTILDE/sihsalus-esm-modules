import dayjs from 'dayjs';
import useSWR from 'swr';
import { openmrsFetch, useAppContext } from '@openmrs/esm-framework';
import { ModuleFuaRestURL } from '../constant';

export interface FuaEstado {
  uuid: string;
  id: number;
  nombre: string;
}

export interface FuaRequest {
  uuid: string;
  id: number;
  visitUuid: string;
  name: string;
  payload: string;
  fuaEstado: FuaEstado;
  fechaCreacion: number;
  fechaActualizacion: number;
}

export interface DateFilterContext {
  dateRange: [Date, Date];
}

const useFuaRequestsDefaultParams: UseFuaRequestsParams = {
  status: null,
  newOrdersOnly: false,
  excludeCanceled: true,
};

export interface UseFuaRequestsParams {
  status: string | null;
  newOrdersOnly: boolean;
  excludeCanceled: boolean;
}

/**
 * Custom hook for retrieving FUA requests based on the specified status.
 *
 * @param status - The status of the requests to retrieve
 * @param excludeCanceled - Whether to exclude canceled requests
 * @param newOrdersOnly - Whether to retrieve only new orders
 */
export function useFuaRequests(params: Partial<UseFuaRequestsParams> = useFuaRequestsDefaultParams) {
  const { status, newOrdersOnly, excludeCanceled } = { ...useFuaRequestsDefaultParams, ...params };
  const { dateRange } = useAppContext<DateFilterContext>('fua-date-filter') ?? {
    dateRange: [dayjs().startOf('day').toDate(), new Date()],
  };

  let url = `${ModuleFuaRestURL}/list`;
  const queryParams: string[] = [];

  if (status) {
    queryParams.push(`status=${status}`);
  }

  if (excludeCanceled) {
    queryParams.push('excludeCanceled=true');
  }

  if (dateRange) {
    queryParams.push(`startDate=${dateRange.at(0).toISOString()}`);
    queryParams.push(`endDate=${dateRange.at(1).toISOString()}`);
  }

  if (queryParams.length > 0) {
    url = `${url}?${queryParams.join('&')}`;
  }

  const { data, error, mutate, isLoading, isValidating } = useSWR<{
    data: Array<FuaRequest>;
  }>(`${url}`, openmrsFetch);

  const filteredOrders = data?.data?.filter(
    (order) => !newOrdersOnly || (order?.fuaEstado === null || order?.fuaEstado === undefined),
  );

  return {
    fuaOrders: filteredOrders ?? [],
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
}

export function setFuaEstado(fuaRequestId: string, estadoId: number, abortController: AbortController) {
  return openmrsFetch(`${ModuleFuaRestURL}/${fuaRequestId}/estado`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
    body: { estadoId },
  });
}

export function cancelFuaRequest(fuaRequestId: string, comment: string, abortController: AbortController) {
  return openmrsFetch(`${ModuleFuaRestURL}/${fuaRequestId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
    body: { comment },
  });
}

export default useFuaRequests;
