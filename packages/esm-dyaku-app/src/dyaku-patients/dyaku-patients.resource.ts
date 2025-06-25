import { openmrsFetch, useConfig } from '@openmrs/esm-framework';
import useSWR from 'swr';
import type { ConfigObject } from '../config-schema';

export interface DyakuPatient {
  resourceType: 'Patient';
  id: string;
  identifier?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    value?: string;
  }>;
  name?: Array<{
    family?: string;
    given?: string[];
  }>;
  telecom?: Array<{
    system?: 'email' | 'phone';
    value?: string;
  }>;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;
}

export interface DyakuPatientsResponse {
  resourceType: 'Bundle';
  id: string;
  type: 'searchset';
  total?: number;
  entry?: Array<{
    resource: DyakuPatient;
  }>;
}

export interface SyncResult {
  success: boolean;
  synchronized: number;
  failed: number;
  errors: string[];
}

export function useDyakuPatients(page?: number, size: number = 10) {
  const config = useConfig<ConfigObject>();
  const dyakuConfig = config.dyaku;

  const searchParams = new URLSearchParams();
  if (page) searchParams.append('_page', page.toString());
  searchParams.append('_count', size.toString());

  const url = `${dyakuConfig.fhirBaseUrl}/Patient?${searchParams.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<{ data: DyakuPatientsResponse }, Error>(
    `dyaku-patients-${page}-${size}`,
    () => fetchDyakuPatients(url),
  );

  return {
    data: data?.data?.entry?.map((entry) => entry.resource) || [],
    total: data?.data?.total || 0,
    error,
    isLoading,
    mutate,
  };
}

async function fetchDyakuPatients(url: string): Promise<{ data: DyakuPatientsResponse }> {
  try {
    // Intentar con fetch directo primero para evitar problemas de CORS
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching Dyaku patients:', error);
    throw new Error(`Error al conectar con Dyaku FHIR: ${error.message}`);
  }
}

export async function getDyakuPatientById(patientId: string, fhirBaseUrl: string): Promise<DyakuPatient> {
  const url = `${fhirBaseUrl}/Patient/${patientId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/fhir+json',
        'Content-Type': 'application/fhir+json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (fetchError) {
    console.error('Error fetching Dyaku patient by ID:', fetchError);
    throw new Error(`Error al obtener paciente de Dyaku: ${fetchError.message}`);
  }
}

async function getDefaultLocation(): Promise<string> {
  try {
    const response = await openmrsFetch('/ws/rest/v1/location?v=default');
    const locations = response.data?.results || [];
    // Usar la primera ubicación disponible o una por defecto
    return locations.length > 0 ? locations[0].uuid : '8d6c993e-c2cc-11de-8d13-0010c6dffd0f';
  } catch (error) {
    console.error('Error obteniendo ubicación por defecto:', error);
    // Fallback a una ubicación conocida
    return '8d6c993e-c2cc-11de-8d13-0010c6dffd0f';
  }
}

// Función para validar y limpiar DNI peruano (devuelve solo los 8 dígitos principales)
function validateAndFixPeruvianDNI(dni: string): string | null {
  if (!dni || dni.length < 8) return null;

  // Limpiar el DNI (solo números)
  const cleanDNI = dni.replace(/\D/g, '');

  // Si tiene 8 dígitos, devolverlo tal como está
  if (cleanDNI.length === 8) {
    return cleanDNI;
  }

  // Si tiene 9 dígitos, devolver solo los primeros 8 (sin el dígito verificador)
  if (cleanDNI.length === 9) {
    return cleanDNI.substring(0, 8);
  }

  return null;
}

// Función para sincronizar pacientes de Dyaku a OpenMRS
export async function syncDyakuPatientsToOpenMRS(
  fhirBaseUrl: string,
  batchSize: number = 50,
  config: ConfigObject,
): Promise<SyncResult> {
  const result: SyncResult = {
    success: false,
    synchronized: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Obtener pacientes de Dyaku
    const dyakuUrl = `${fhirBaseUrl}/Patient?_count=${batchSize}`;
    const dyakuResponse = await fetchDyakuPatients(dyakuUrl);
    const dyakuPatients = dyakuResponse.data.entry?.map((entry) => entry.resource) || [];

    for (const dyakuPatient of dyakuPatients) {
      try {
        // Verificar si el paciente ya existe en OpenMRS
        const existingPatient = await findPatientByIdentifier(dyakuPatient.identifier?.[0]?.value);

        if (!existingPatient) {
          // Crear nuevo paciente en OpenMRS
          await createPatientInOpenMRS(dyakuPatient, config);
          result.synchronized++;
        } else {
          // Actualizar paciente existente si es necesario
          await updatePatientInOpenMRS(existingPatient.uuid, dyakuPatient, config);
          result.synchronized++;
        }
      } catch (patientError) {
        result.failed++;
        result.errors.push(`Error procesando paciente ${dyakuPatient.id}: ${patientError.message}`);
      }
    }

    result.success = result.failed === 0;
    return result;
  } catch (error) {
    result.errors.push(`Error general de sincronización: ${error.message}`);
    return result;
  }
}

async function findPatientByIdentifier(identifier?: string): Promise<any> {
  if (!identifier) return null;

  try {
    const response = await openmrsFetch(`/ws/rest/v1/patient?identifier=${identifier}&v=default`);
    const patients = response.data?.results || [];
    return patients.length > 0 ? patients[0] : null;
  } catch (error) {
    console.error('Error buscando paciente por identificador:', error);
    return null;
  }
}

async function createPatientInOpenMRS(dyakuPatient: DyakuPatient, config: ConfigObject): Promise<void> {
  const openMRSPatient = await mapDyakuToOpenMRSPatient(dyakuPatient, config);

  try {
    await openmrsFetch('/ws/rest/v1/patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: openMRSPatient,
    });
  } catch (error) {
    throw new Error(`Error creando paciente en OpenMRS: ${error.message}`);
  }
}

async function updatePatientInOpenMRS(
  patientUuid: string,
  dyakuPatient: DyakuPatient,
  config: ConfigObject,
): Promise<void> {
  const openMRSPatient = await mapDyakuToOpenMRSPatient(dyakuPatient, config);

  try {
    await openmrsFetch(`/ws/rest/v1/patient/${patientUuid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: openMRSPatient,
    });
  } catch (error) {
    throw new Error(`Error actualizando paciente en OpenMRS: ${error.message}`);
  }
}

// Función para generar identificador automático usando idgen
async function generateAutoIdentifier(identifierSourceUuid: string): Promise<string> {
  try {
    const response = await openmrsFetch(`/ws/rest/v1/idgen/identifiersource/${identifierSourceUuid}/identifier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
    });
    return response.data.identifier;
  } catch (error) {
    throw new Error(`Error generando identificador automático: ${error.message}`);
  }
}

async function mapDyakuToOpenMRSPatient(dyakuPatient: DyakuPatient, config: ConfigObject): Promise<any> {
  const name = dyakuPatient.name?.[0];
  const identifier = dyakuPatient.identifier?.[0];
  const email = dyakuPatient.telecom?.find((t) => t.system === 'email')?.value;
  const phone = dyakuPatient.telecom?.find((t) => t.system === 'phone')?.value;

  // Obtener configuración de los parámetros
  const { identifierSourceUuid, dniIdentifierTypeUuid } = config.dyaku;

  // Obtener ubicación por defecto dinámicamente
  const defaultLocation = await getDefaultLocation();

  // Generar identificador automático
  const autoIdentifier = await generateAutoIdentifier(identifierSourceUuid);

  // Validar y corregir DNI peruano si es necesario
  let validatedDNI = identifier?.value;
  if (identifier?.value) {
    const correctedDNI = validateAndFixPeruvianDNI(identifier.value);
    if (correctedDNI) {
      validatedDNI = correctedDNI;
    }
  }

  // Crear array de identificadores: primero el auto-generado, luego el DNI
  const identifiers = [
    // Identificador principal auto-generado
    {
      identifier: autoIdentifier,
      identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334', // HSC identifier type
      location: defaultLocation,
      preferred: true,
    },
  ];

  // Agregar DNI como identificador secundario si existe
  if (validatedDNI) {
    identifiers.push({
      identifier: validatedDNI,
      identifierType: dniIdentifierTypeUuid, // DNI identifier type
      location: defaultLocation,
      preferred: false,
    });
  }

  return {
    identifiers,
    person: {
      names: name
        ? [
            {
              givenName: name.given?.join(' ') || '',
              familyName: name.family || '',
              preferred: true,
            },
          ]
        : [],
      gender: dyakuPatient.gender === 'female' ? 'F' : dyakuPatient.gender === 'male' ? 'M' : 'U',
      birthdate: dyakuPatient.birthDate || null,
      attributes: [
        ...(email
          ? [
              {
                attributeType: 'b2c38640-2603-4629-aebd-3b54f33f1e3a', // Email attribute type
                value: email,
              },
            ]
          : []),
        ...(phone
          ? [
              {
                attributeType: '14d4f066-15f5-102d-96e4-000c29c2a5d7', // Phone attribute type
                value: phone,
              },
            ]
          : []),
      ],
    },
  };
}

// Función para sincronizar un solo paciente
export async function syncSinglePatientToOpenMRS(
  dyakuPatient: DyakuPatient,
  config: ConfigObject,
): Promise<SyncResult> {
  const result: SyncResult = {
    success: false,
    synchronized: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Verificar si el paciente ya existe en OpenMRS
    const existingPatient = await findPatientByIdentifier(dyakuPatient.identifier?.[0]?.value);

    if (!existingPatient) {
      // Crear nuevo paciente en OpenMRS
      await createPatientInOpenMRS(dyakuPatient, config);
      result.synchronized = 1;
      result.success = true;
    } else {
      // Actualizar paciente existente si es necesario
      await updatePatientInOpenMRS(existingPatient.uuid, dyakuPatient, config);
      result.synchronized = 1;
      result.success = true;
    }
  } catch (error) {
    result.failed = 1;
    result.errors.push(`Error procesando paciente ${dyakuPatient.id}: ${error.message}`);
  }

  return result;
}

export function useDyakuPatientsByIdentifier(identifier: string) {
  const config = useConfig<ConfigObject>();
  const dyakuConfig = config.dyaku;

  const url = identifier ? `${dyakuConfig.fhirBaseUrl}/Patient?identifier=${identifier}` : null;

  const { data, error, isLoading, mutate } = useSWR<{ data: DyakuPatientsResponse }, Error>(
    url ? `dyaku-patients-identifier-${identifier}` : null,
    () => fetchDyakuPatients(url!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  return {
    data: data?.data?.entry?.map((entry) => entry.resource) || [],
    total: data?.data?.total || 0,
    error,
    isLoading,
    mutate,
  };
}

export function useDyakuSync() {
  const config = useConfig<ConfigObject>();
  const dyakuConfig = config.dyaku;

  const syncPatients = async (): Promise<SyncResult> => {
    if (!dyakuConfig.syncEnabled) {
      throw new Error('Sincronización deshabilitada en la configuración');
    }

    return await syncDyakuPatientsToOpenMRS(dyakuConfig.fhirBaseUrl, dyakuConfig.syncBatchSize, config);
  };

  const syncSinglePatient = async (patient: DyakuPatient): Promise<SyncResult> => {
    if (!dyakuConfig.syncEnabled) {
      throw new Error('Sincronización deshabilitada en la configuración');
    }

    return await syncSinglePatientToOpenMRS(patient, config);
  };

  return {
    syncPatients,
    syncSinglePatient,
    isEnabled: dyakuConfig.syncEnabled,
    batchSize: dyakuConfig.syncBatchSize,
    intervalMinutes: dyakuConfig.syncIntervalMinutes,
  };
}
