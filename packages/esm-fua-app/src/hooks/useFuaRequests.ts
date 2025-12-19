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

  // ---- GET /list ----
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

  // ---- POST /visitInfo/:visitUuid/generator/:identifier ----
  const generateFua = async (visitUuid: string) => {
    const identifier = "cbc5e270-1f2d-40f2-99c2-562af39233e3";
    const url = `${ModuleFuaRestURL}/visitInfo/${visitUuid}/generator/${identifier}`;

    const response = await fetch(url, { method: "POST" });
    return await response.text();
  };


  return { data, isLoading, error, generateFua };
}

export default useFuaRequests;
