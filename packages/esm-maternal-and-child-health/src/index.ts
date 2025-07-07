// index.ts
import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { createDashboardGroup } from './clinical-view-group/createDashboardGroup';
import { configSchema } from './config-schema';


// Maternal and Child Health Components
import {
  labourAndDeliveryDashboardMeta,
  maternalAndChildHealthNavGroup,
  postnatalDashboardMeta,
  prenatalDashboardMeta,
} from './maternal-and-child-health/dashboard.meta';
import { LabourDelivery } from './maternal-and-child-health/labour-delivery.component';
import { PostnatalCare } from './maternal-and-child-health/postnatal-care.component';
import { PrenatalCare } from './maternal-and-child-health/prenatal-care.component';
import DeliberyOrAbortionTable from './maternal-and-child-health/components/labour-delivery/deliveryOrAbortion.component';
import SummaryOfLaborAndPostpartumTable from './maternal-and-child-health/components/labour-delivery/summaryOfLaborAndPostpartum.component';
import ImmediatePostpartumTable from './maternal-and-child-health/components/postnatal-care/immediatePostpartum.component';
import PostpartumControlTable from './maternal-and-child-health/components/postnatal-care/postpartumControl.component';
import CurrentPregnancyTable from './maternal-and-child-health/components/prenatal-care/currentPregnancy.component';
import MaternalHistoryTable from './maternal-and-child-health/components/prenatal-care/maternalHistory.component';
import PrenatalCareChart from './maternal-and-child-health/components/prenatal-care/prenatalCareChart.component';
import PartographChart from './ui/partography/partograph-chart';
import { ObstetricHistoryBase } from './ui/obstetric-history-widget';

// Well Child Care Components
import {
  childImmunizationScheduleDashboardMeta,
  neonatalCareDashboardMeta,
  wellChildCareNavGroup,
  wellChildControlDashboardMeta,
} from './well-child-care/dashboard.meta';
import { ChildImmunizationSchedule } from './well-child-care/child-immunization.component';
import { NeonatalCare } from './well-child-care/neonatal-care.component';
import { WellChildControl } from './well-child-care/well-child-control.component';
import AlojamientoConjunto from './well-child-care/components/alojamiento-conjunto';
import CredControlsCheckout from './well-child-care/components/cred-controls-timeline/cred-checkups.component';
import CredControlsMatrix from './well-child-care/components/cred-controls-timeline/cred-matrix.component';
import CredControlsTimeline from './well-child-care/components/cred-controls-timeline/cred-controls-timeline.component';
import BirthDataTable from './well-child-care/components/neonatal-register/detalles-nacimiento/birth-date.component';
import PregnancyBirthTable from './well-child-care/components/neonatal-register/detalles-embarazo/pregnancy-table.component';
import LabourHistory from './well-child-care/components/neonatal-register/labour-history/labour-history.component';
import NeonatalAttention from './well-child-care/components/neonatal-attention/neonatal-attention.component';
import NeonatalCounseling from './well-child-care/components/neonatal-counseling/neonatal-consuling.component';
import NeonatalEvaluation from './well-child-care/components/neonatal-evaluation/neonatal-evaluation.component';
import NewbornBalanceOverview from './well-child-care/components/newborn-monitoring/newborn balance/balance-overview.component';
import NewbornBiometricsBase from './well-child-care/components/newborn-monitoring/newborn biometrics/biometrics-base.component';
import VaccinationSchedule from './well-child-care/components/vaccination-schema-widget/vaccinationSchedule.component';
import { AdverseReactionForm } from './well-child-care/workspace/adverse-reaction/adverseReaction.component';
import ChildMedicalHistory from './ui/conditions-filter/conditions-overview.component';

// Module Configuration
const moduleName = '@pucp-gidis-hiisc/esm-maternal-and-child-health-app';
const options = {
  featureName: 'patient-clinical-view-app',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

// ================================================================================
// CONFIGURATION
// ================================================================================
export function startupApp(): void {
  defineConfigSchema(moduleName, configSchema);
}

// ================================================================================
// MATERNAL AND CHILD HEALTH EXPORTS
// ================================================================================
export const maternalAndChildHealthSideNavGroup = getSyncLifecycle(
  createDashboardGroup(maternalAndChildHealthNavGroup),
  options,
);

// Navigation Links
export const labourAndDeliveryLink = getSyncLifecycle(
  createDashboardLink({ ...labourAndDeliveryDashboardMeta, moduleName }),
  options,
);
export const postnatalCareLink = getSyncLifecycle(
  createDashboardLink({ ...postnatalDashboardMeta, moduleName }),
  options,
);
export const prenatalCareLink = getSyncLifecycle(
  createDashboardLink({ ...prenatalDashboardMeta, moduleName }),
  options,
);

// Main Components
export const labourAndDelivery = getSyncLifecycle(LabourDelivery, options);
export const postnatalCare = getSyncLifecycle(PostnatalCare, options);
export const prenatalCare = getSyncLifecycle(PrenatalCare, options);

// Labour & Delivery Components
export const deliberyOrAbortionTable = getSyncLifecycle(DeliberyOrAbortionTable, options);
export const partograph = getSyncLifecycle(PartographChart, options);
export const summaryOfLaborAndPostpartumTable = getSyncLifecycle(SummaryOfLaborAndPostpartumTable, options);

// Obstetric History
export const obstetricHistoryChart = getSyncLifecycle(ObstetricHistoryBase, options);

// Postnatal Care Components
export const immediatePostpartumTable = getSyncLifecycle(ImmediatePostpartumTable, options);
export const postpartumControlTable = getSyncLifecycle(PostpartumControlTable, options);

// Prenatal Care Components
export const currentPregnancyTable = getSyncLifecycle(CurrentPregnancyTable, options);
export const maternalHistoryTable = getSyncLifecycle(MaternalHistoryTable, options);
export const prenatalCareChart = getSyncLifecycle(PrenatalCareChart, options);

// ================================================================================
// WELL CHILD CARE EXPORTS
// ================================================================================
export const wellChildCareSideNavGroup = getSyncLifecycle(createDashboardGroup(wellChildCareNavGroup), options);

// Navigation Links
export const childImmunizationScheduleLink = getSyncLifecycle(
  createDashboardLink({ ...childImmunizationScheduleDashboardMeta, moduleName }),
  options,
);
export const neonatalCareLink = getSyncLifecycle(
  createDashboardLink({ ...neonatalCareDashboardMeta, moduleName }),
  options,
);
export const wellChildCareLink = getSyncLifecycle(
  createDashboardLink({ ...wellChildControlDashboardMeta, moduleName }),
  options,
);

// Main Components
export const childImmunizationSchedule = getSyncLifecycle(ChildImmunizationSchedule, options);
export const neonatalCare = getSyncLifecycle(NeonatalCare, options);
export const wellChildCare = getSyncLifecycle(WellChildControl, options);

// CRED Controls
export const credCheckouts = getSyncLifecycle(CredControlsCheckout, options);
export const credControls = getSyncLifecycle(CredControlsTimeline, options);
export const credControlsMatrix = getSyncLifecycle(CredControlsMatrix, options);

// Neonatal Components
export const alojamientoConjunto = getSyncLifecycle(AlojamientoConjunto, options);
export const neonatalAttentionChart = getSyncLifecycle(NeonatalAttention, options);
export const neonatalCounselingChart = getSyncLifecycle(NeonatalCounseling, options);
export const neonatalEvaluationChart = getSyncLifecycle(NeonatalEvaluation, options);
export const neonatalRegisterBirth = getSyncLifecycle(BirthDataTable, options);
export const neonatalRegisterChart = getSyncLifecycle(LabourHistory, options);
export const pregnancyDetails = getSyncLifecycle(PregnancyBirthTable, options);

// Newborn Monitoring
export const newbornBalanceOverviewChart = getSyncLifecycle(NewbornBalanceOverview, options);
export const newbornBiometricsBaseChart = getSyncLifecycle(NewbornBiometricsBase, options);

// Vaccination Components
export const vaccinationAppointment = getSyncLifecycle(AdverseReactionForm, options);
export const vaccinationSchedule = getSyncLifecycle(VaccinationSchedule, options);

// Child Medical History
export const childMedicalHistory = getSyncLifecycle(ChildMedicalHistory, options);

// ================================================================================
// ASYNC COMPONENTS
// ================================================================================
export const alturaUterinaChart = getAsyncLifecycle(
  () => import('./ui/alturaCuello-chart/altura-cuello-overview.component'),
  options,
);
export const growthChart = getAsyncLifecycle(
  () => import('./ui/growth-chart/growth-chart-overview.component'),
  options,
);
export const monthlyAppointmentFilterCalendar = getAsyncLifecycle(
  () => import('./ui/appointment-filter-calendar/appointment-filter-calendar'),
  options,
);
export const newbornAnthropometricsworkspace = getAsyncLifecycle(
  () => import('./well-child-care/workspace/newborn-triage/newborn-anthropometrics.workspace'),
  options,
);
export const newbornFluidBalanceworkspace = getAsyncLifecycle(
  () => import('./well-child-care/workspace/newborn-triage/newborn-fluid-balance.workspace'),
  options,
);
export const perinatalRegisterworkspace = getAsyncLifecycle(
  () => import('./well-child-care/workspace/perinatal-register/perinatal-register-form.workspace'),
  options,
);
export const schedulingAdminPageCardLink = getAsyncLifecycle(
  () => import('./immunization-plan/scheduling-admin-link.component'),
  options,
);
export const wellchildControlsworkspace = getAsyncLifecycle(
  () => import('./well-child-care/workspace/well-child-control/well-child-controls-form.workspace'),
  options,
);
export const conditionsFilterWorkspace = getAsyncLifecycle(
  () => import('./ui/conditions-filter/conditions-form.workspace'),
  options,
);
export const conditionFilterDeleteConfirmationDialog = getAsyncLifecycle(
  () => import('./ui/conditions-filter/delete-condition.modal'),
  options,
);
export const genericConditionsOverview = getAsyncLifecycle(
  () => import('./ui/conditions-filter/generic-conditions-overview.component'),
  options,
);
export const antecedentesPatologicos = getAsyncLifecycle(
  () => import('./well-child-care/antecedentes-patologicos.component'),
  options,
);
export const antecedentesPatologicosFormWorkspace = getAsyncLifecycle(
  () => import('./well-child-care/antecedentes-patologicos-form.workspace'),
  options,
);
export const formsSelectorWorkspace = getAsyncLifecycle(
  () => import('./ui/forms-selector/forms-selector.workspace'),
  options,
);