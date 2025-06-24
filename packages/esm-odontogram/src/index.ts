import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

const moduleName = '@sihsalus/esm-odontogram';

const options = {
  featureName: 'odontogram',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(() => import('./root.component'), options);

// Dashboard links and extensions
export const odontogramDashboardLink = getAsyncLifecycle(() => import('./odontogram-nav-link.component'), options);
