import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

const moduleName = '@sihsalus/esm-dyaku-integration';

const options = {
  featureName: 'dyaku-integration',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(() => import('./root.component'), options);

// Dashboard links and extensions
export const dyakuIntegrationDashboardLink = getSyncLifecycle(
  () => import('./dyaku-nav-link.component'),
  options,
);
