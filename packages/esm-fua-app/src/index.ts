import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { configSchema } from './config-schema';
import { createLeftPanelLink } from './left-panel-link.component';
import FuaRequestTable from './fua/fuaRequestTable';
import { FuaRequestDashboardMeta } from './dashboard.meta';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@pucp-gidis-hiisc/esm-fua-app';
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

// ================================================================================
// FUA REQUEST EXPORTS
// ================================================================================
export const fuaRequestDashboardLink = getSyncLifecycle(createLeftPanelLink(FuaRequestDashboardMeta), options);
export const fuaRequestTable = getSyncLifecycle(FuaRequestTable, options);
