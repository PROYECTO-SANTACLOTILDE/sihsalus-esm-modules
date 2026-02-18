import { openmrsFetch } from '@openmrs/esm-framework';
import useSWR from 'swr';
import { baseUrl } from '../constants';

const API_URL = `${baseUrl}/supply`;

export interface Supply {
  id: number;
  uuid: string;
  name: string;
  supplyType: string;
  unitAcquisition: string;
  unitConsumption: string;
  equivalence: number;
}

const useGetSupply = () => {
  const { data, error, isLoading } = useSWR<{ data: Supply[] }>(API_URL, openmrsFetch);

  return {
    supply: data?.data,
    isError: error,
    isLoading,
  };
};

export default useGetSupply;
