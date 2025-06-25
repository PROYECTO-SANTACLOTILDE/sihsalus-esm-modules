import { useEffect, useState } from 'react';
import { openmrsFetch } from '@openmrs/esm-framework';
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

function useFuaRequests() {
  const [data, setData] = useState<FuaRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data: response } = await openmrsFetch(`${ModuleFuaRestURL}/list`);
        setData(response as FuaRequest[]);
      } catch (err: any) {
        console.error('Error fetching FUA list:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export default useFuaRequests;
