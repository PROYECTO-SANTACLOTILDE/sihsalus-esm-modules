import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  enableAdvancedOdontogram: {
    _type: Type.Boolean,
    _default: true,
    _description: 'Habilitar funcionalidades avanzadas del odontograma',
  },
  defaultTeethNotation: {
    _type: Type.String,
    _default: 'FDI',
    _description: 'Sistema de notación dental por defecto (FDI, Universal, Palmer)',
    _validators: [
      {
        validator: (value: string) => ['FDI', 'Universal', 'Palmer'].includes(value),
        message: 'El sistema de notación debe ser FDI, Universal o Palmer',
      },
    ],
  },
  autoSaveInterval: {
    _type: Type.Number,
    _default: 30000,
    _description: 'Intervalo de guardado automático en milisegundos',
  },
};

export interface Config {
  enableAdvancedOdontogram: boolean;
  defaultTeethNotation: 'FDI' | 'Universal' | 'Palmer';
  autoSaveInterval: number;
}
