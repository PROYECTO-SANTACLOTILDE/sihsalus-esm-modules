import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import DyakuNavLink from './dyaku-nav-link.component';

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
export const dyakuIntegrationDashboardLink = getSyncLifecycle(DyakuNavLink, options);
