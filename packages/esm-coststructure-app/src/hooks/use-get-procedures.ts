import { openmrsFetch } from "@openmrs/esm-framework"
import useSWR from "swr"
import { baseUrl } from "../constants"

const API_URL = `${baseUrl}/procedures`

export interface Procedure {
    conceptId: number,
    nameFull: string,
    code: string
}

const useGetProcedures = (query = "") => {
    const params = new URLSearchParams({ query });
    const URL = `${API_URL}?${params.toString()}`;
    const { data, error, isLoading } = useSWR<{data: Procedure[]}>(
        URL,
        openmrsFetch
    );
    return {
        procedures: data?.data,
        isError: error,
        isLoading
    }
}

export default useGetProcedures;