import { openmrsFetch } from "@openmrs/esm-framework"
import useSWR from "swr"
import { baseUrl } from "../constants"

const API_URL = `${baseUrl}/supply`
// supplyMocks.ts
export const mockSupplyData = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    name: "Aspirina",
    supplyType: "FUNGIBLE",
    unitAcquisition: "Caja",
    unitConsumption: "Tableta",
    equivalence: 1,
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    name: "Guantes de Látex",
    supplyType: "FUNGIBLE",
    unitAcquisition: "Caja",
    unitConsumption: "Par",
    equivalence: 50,
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    name: "Jeringa 10ml",
    supplyType: "FUNGIBLE",
    unitAcquisition: "Caja",
    unitConsumption: "Unidad",
    equivalence: 100,
  },
  {
    id: 4,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    name: "Termómetro Digital",
    supplyType: "NO_FUNGIBLE",
    unitAcquisition: "Unidad",
    unitConsumption: "Unidad",
    equivalence: 1,
  },
  {
    id: 5,
    uuid: "123e4567-e89b-12d3-a456-426614174004",
    name: "Estetoscopio",
    supplyType: "NO_FUNGIBLE",
    unitAcquisition: "Unidad",
    unitConsumption: "Unidad",
    equivalence: 1,
  },
  {
    id: 6,
    uuid: "123e4567-e89b-12d3-a456-426614174005",
    name: "Guantes de Nitrilo",
    supplyType: "FUNGIBLE",
    unitAcquisition: "Caja",
    unitConsumption: "Par",
    equivalence: 100,
  },
  {
    id: 7,
    uuid: "123e4567-e89b-12d3-a456-426614174006",
    name: "Mascarilla N95",
    supplyType: "FUNGIBLE",
    unitAcquisition: "Caja",
    unitConsumption: "Unidad",
    equivalence: 20,
  },
  {
    id: 8,
    uuid: "123e4567-e89b-12d3-a456-426614174007",
    name: "Silla de Ruedas",
    supplyType: "NO_FUNGIBLE",
    unitAcquisition: "Unidad",
    unitConsumption: "Unidad",
    equivalence: 1,
  },
  {
    id: 9,
    uuid: "123e4567-e89b-12d3-a456-426614174008",
    name: "Bisturí",
    supplyType: "NO_FUNGIBLE",
    unitAcquisition: "Unidad",
    unitConsumption: "Unidad",
    equivalence: 1,
  },
  {
    id: 10,
    uuid: "123e4567-e89b-12d3-a456-426614174009",
    name: "Gasas Estériles",
    supplyType: "FUNGIBLE",
    unitAcquisition: "Paquete",
    unitConsumption: "Unidad",
    equivalence: 50,
  }
];

export interface Supply{
    id: number,
    uuid: string,
    name:string
    supplyType: string,
    unitAcquisition: string,
    unitConsumption: string,
    equivalence: number,
}

const useGetSupply = () => {
  const { data, error, isLoading } = useSWR<{ data: Supply[] }>(
    API_URL,
    () => {
      // Simulamos una respuesta con los datos mockeados
      return new Promise<{ data: Supply[] }>((resolve) => {
        setTimeout(() => {
          resolve({ data: mockSupplyData });
        }, 500); // Simulamos un retraso en la respuesta
      });
    }
  );

  return {
    supply: data?.data,
    isError: error,
    isLoading,
  };
};

export default useGetSupply;