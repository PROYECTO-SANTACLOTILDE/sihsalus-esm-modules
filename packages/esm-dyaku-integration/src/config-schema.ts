import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  dyakuApiUrl: {
    _type: Type.String,
    _default: 'https://api.dyaku.gob.pe',
    _description: 'URL base de la API de DYAKU',
  },
  padronNacionalApiUrl: {
    _type: Type.String,
    _default: 'https://api.padron.gob.pe',
    _description: 'URL base de la API del Padrón Nacional',
  },
  enableSync: {
    _type: Type.Boolean,
    _default: true,
    _description: 'Habilitar sincronización automática con DYAKU',
  },
  syncInterval: {
    _type: Type.Number,
    _default: 300000,
    _description: 'Intervalo de sincronización en milisegundos',
  },
};

export interface Config {
  dyakuApiUrl: string;
  padronNacionalApiUrl: string;
  enableSync: boolean;
  syncInterval: number;
}
