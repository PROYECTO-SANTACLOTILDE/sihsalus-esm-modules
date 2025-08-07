import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@pucp-gidis-hiisc/esm-dyaku-app';
const options = {
  featureName: 'patient-clinical-view-app',
  moduleName,
};

// ================================================================================
// CONFIGURATION
// ================================================================================
export function startupApp(): void {
  defineConfigSchema(moduleName, configSchema);
}

export const dyakuPatientsLink = getAsyncLifecycle(
  () => import('./dyaku-patients/dyaku-patients-link.component'),
  options,
);

export const dyakuPatientsPage = getAsyncLifecycle(() => import('./dyaku-patients/dyaku.main.component'), options);
