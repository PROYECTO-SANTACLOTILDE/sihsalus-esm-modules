import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createLeftPanelLink } from './left-panel-link.component';
import rootComponent from './root.component';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@pucp-gidis-hiisc/esm-fua-app';

const options = {
  featureName: 'fua',
  moduleName,
};

// ================================================================================
// CONFIGURATION
// ================================================================================
export function startupApp(): void {
  defineConfigSchema(moduleName, configSchema);
}

// ================================================================================
// ROOT COMPONENT
// ================================================================================
export const root = getSyncLifecycle(rootComponent, options);

// ================================================================================
// DASHBOARD LINK
// ================================================================================
export const fuaDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    name: 'fua-request',
    title: 'Formato Único de Atención',
  }),
  options,
);

// ================================================================================
// TILES
// ================================================================================
export const allFuaRequestsTile = getAsyncLifecycle(
  () => import('./fua-tiles/all-fua-requests-tile.component'),
  options,
);

export const inProgressFuaRequestsTile = getAsyncLifecycle(
  () => import('./fua-tiles/in-progress-fua-requests-tile.component'),
  options,
);

export const completedFuaRequestsTile = getAsyncLifecycle(
  () => import('./fua-tiles/completed-fua-requests-tile.component'),
  options,
);

// ================================================================================
// TABLES/TABS
// ================================================================================
export const allFuaRequestsTable = getAsyncLifecycle(
  () => import('./fua-tabs/data-table-extensions/all-fua-requests-table.extension'),
  options,
);

export const inProgressFuaRequestsTable = getAsyncLifecycle(
  () => import('./fua-tabs/data-table-extensions/in-progress-fua-requests-table.extension'),
  options,
);

export const completedFuaRequestsTable = getAsyncLifecycle(
  () => import('./fua-tabs/data-table-extensions/completed-fua-requests-table.extension'),
  options,
);

export const declinedFuaRequestsTable = getAsyncLifecycle(
  () => import('./fua-tabs/data-table-extensions/declined-fua-requests-table.extension'),
  options,
);
