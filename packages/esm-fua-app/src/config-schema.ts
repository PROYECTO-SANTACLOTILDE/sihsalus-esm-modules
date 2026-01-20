import { Type, validators } from '@openmrs/esm-framework';


// ===============================
// MAIN CONFIGURATION SCHEMA
// ===============================

export const configSchema = {
  enableFuaApprovalWorkflow: {
    _type: Type.Boolean,
    _default: false,
    _description: 'Habilitar el flujo de aprobación de FUA (Formato Único de Atención)',
  },
};
export type Config = {
  enableReviewingLabResultsBeforeApproval: boolean;
};
