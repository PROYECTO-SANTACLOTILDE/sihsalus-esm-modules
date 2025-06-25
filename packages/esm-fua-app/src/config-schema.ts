import { Type } from '@openmrs/esm-framework';

// ===============================
// MAIN CONFIGURATION SCHEMA
// ===============================

export const configSchema = {
  dyaku: {
    _type: Type.Object,
    _description: 'Configuración para conectar con el sistema FHIR Dyaku del MINSA',
    _default: {
      fhirBaseUrl: 'https://dyaku.minsa.gob.pe/fhir',
      syncEnabled: true,
      syncBatchSize: 50,
      syncIntervalMinutes: 30,
      identifierSourceUuid: '8549f706-7e85-4c1d-9424-217d50a2988b',
      dniIdentifierTypeUuid: '550e8400-e29b-41d4-a716-446655440001',
    },
    fhirBaseUrl: {
      _type: Type.String,
      _description: 'URL base del servidor FHIR de Dyaku',
      _default: 'https://dyaku.minsa.gob.pe/fhir',
    },
    syncEnabled: {
      _type: Type.Boolean,
      _description: 'Habilitar sincronización automática de pacientes desde Dyaku',
      _default: true,
    },
    syncBatchSize: {
      _type: Type.Number,
      _description: 'Número de pacientes a sincronizar por lote',
      _default: 50,
    },
    syncIntervalMinutes: {
      _type: Type.Number,
      _description: 'Intervalo en minutos para sincronización automática',
      _default: 30,
    },
    identifierSourceUuid: {
      _type: Type.String,
      _description: 'UUID del IdGen source para generar identificadores automáticos',
      _default: '8549f706-7e85-4c1d-9424-217d50a2988b',
    },
    dniIdentifierTypeUuid: {
      _type: Type.String,
      _description: 'UUID del tipo de identificador para DNI peruano',
      _default: '550e8400-e29b-41d4-a716-446655440001',
    },
  },
};

export interface ConfigObject {
  dyaku: {
    fhirBaseUrl: string;
    syncEnabled: boolean;
    syncBatchSize: number;
    syncIntervalMinutes: number;
    identifierSourceUuid: string;
    dniIdentifierTypeUuid: string;
  };
}
