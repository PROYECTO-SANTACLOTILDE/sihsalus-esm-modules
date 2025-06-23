// ================================================================================
// IMPORTS
// ================================================================================

// Framework and Common Imports
import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { createDashboardGroup } from './clinical-view-group/createDashboardGroup';
import { createLeftPanelLink } from './left-panel-link.component';

// Configuration and Schema
import { configSchema } from './config-schema';
import {
  caseEncounterDashboardMeta,
  caseManagementDashboardMeta,
  contactListDashboardMeta,
  familyHistoryDashboardMeta,
  FuaRequestDashboardMeta,
  otherRelationshipsDashboardMeta,
  relationshipsDashboardMeta,
  socialHistoryDashboardMeta,
} from './dashboard.meta';

// ================================================================================
// CASE MANAGEMENT DOMAIN
// ================================================================================
import CaseEncounterOverviewComponent from './case-management/encounters/case-encounter-overview.component';
import EndRelationshipWorkspace from './case-management/workspace/case-management-workspace.component';
import CaseManagementForm from './case-management/workspace/case-management.workspace';
import WrapComponent from './case-management/wrap/wrap.component';

// ================================================================================
// CLINICAL ENCOUNTERS DOMAIN
// ================================================================================
import ClinicalEncounterDashboard from './clinical-encounter/dashboard/clinical-encounter-dashboard.component';
import ClinicalViewSection from './clinical-view-group/clinical-view-section.component';

// ================================================================================
// CONTACT LIST DOMAIN
// ================================================================================
import ContactList from './contact-list/contact-list.component';
import ContactListForm from './contact-list/contact-list.workspace';

// ================================================================================
// FAMILY HISTORY DOMAIN
// ================================================================================
import FamilyHistory from './family-partner-history/family-history.component';
import FamilyRelationshipForm from './family-partner-history/family-relationship.workspace';

// ================================================================================
// FUA REQUEST DOMAIN
// ================================================================================
import FuaRequestTable from './fua/fuaRequestTable';

// ================================================================================
// MATERNAL AND CHILD HEALTH DOMAIN
// ================================================================================
import {
  labourAndDeliveryDashboardMeta,
  maternalAndChildHealthNavGroup,
  postnatalDashboardMeta,
  prenatalDashboardMeta,
} from './maternal-and-child-health/dashboard.meta';
import { LabourDelivery } from './maternal-and-child-health/labour-delivery.component';
import { PostnatalCare } from './maternal-and-child-health/postnatal-care.component';
import { PrenatalCare } from './maternal-and-child-health/prenatal-care.component';

// Labour & Delivery Components
import DeliberyOrAbortionTable from './maternal-and-child-health/components/labour-delivery/deliveryOrAbortion.component';
import Partograph from './maternal-and-child-health/components/labour-delivery/partography/partograph.component';
import SummaryOfLaborAndPostpartumTable from './maternal-and-child-health/components/labour-delivery/summaryOfLaborAndPostpartum.component';

// Postnatal Care Components
import ImmediatePostpartumTable from './maternal-and-child-health/components/postnatal-care/immediatePostpartum.component';
import PostpartumControlTable from './maternal-and-child-health/components/postnatal-care/postpartumControl.component';

// Prenatal Care Components
import CurrentPregnancyTable from './maternal-and-child-health/components/prenatal-care/currentPregnancy.component';
import MaternalHistoryTable from './maternal-and-child-health/components/prenatal-care/maternalHistory.component';
import PrenatalCareChart from './maternal-and-child-health/components/prenatal-care/prenatalCareChart.component';

// ================================================================================
// OTHER RELATIONSHIPS DOMAIN
// ================================================================================
import { OtherRelationships } from './other-relationships/other-relationships.component';
import { OtherRelationshipsForm } from './other-relationships/other-relationships.workspace';

// ================================================================================
// RELATIONSHIPS DOMAIN
// ================================================================================
import RelationshipUpdateForm from './relationships/forms/relationships-update-form.workspace';
import BirthDateCalculator from './relationships/modals/birthdate-calculator.modal';
import DeleteRelationshipConfirmDialog from './relationships/modals/delete-relationship-dialog.modal';
import Relationships from './relationships/relationships.component';

// ================================================================================
// SPECIALIZED CLINICS DOMAIN
// ================================================================================
import GenericDashboard from './specialized-clinics/generic-nav-links/generic-dashboard.component';
import GenericNavLinks from './specialized-clinics/generic-nav-links/generic-nav-links.component';
import { specialClinicsNavGroup } from './specialized-clinics/special-clinic-dashboard.meta';

// HIV Care & Treatment Services
import DefaulterTracing from './specialized-clinics/hiv-care-and-treatment-services/defaulter-tracing/defaulter-tracing.component';
import {
  defaulterTracingDashboardMeta,
  hivCareAndTreatmentNavGroup,
  htsDashboardMeta,
} from './specialized-clinics/hiv-care-and-treatment-services/hiv-care-and-treatment-dashboard.meta';
import HivTestingEncountersList from './specialized-clinics/hiv-care-and-treatment-services/hiv-testing-services/views/hiv-testing/hiv-testing-services.component';

// ================================================================================
// UI COMPONENTS DOMAIN
// ================================================================================
import { ObstetricHistoryBase } from './ui/obstetric-history-widget';

// ================================================================================
// WELL CHILD CARE DOMAIN
// ================================================================================
import { ChildImmunizationSchedule } from './well-child-care/child-immunization.component';
import {
  childImmunizationScheduleDashboardMeta,
  neonatalCareDashboardMeta,
  wellChildCareNavGroup,
  wellChildControlDashboardMeta,
} from './well-child-care/dashboard.meta';
import { NeonatalCare } from './well-child-care/neonatal-care.component';
import { WellChildControl } from './well-child-care/well-child-control.component';

// CRED Controls Components
import CredControlsCheckout from './well-child-care/components/cred-controls-timeline/cred-checkups.component';
import CredControlsTimeline from './well-child-care/components/cred-controls-timeline/cred-controls-timeline.component';
import CredControlsMatrix from './well-child-care/components/cred-controls-timeline/cred-matrix.component';

// Neonatal Components
import AlojamientoConjunto from './well-child-care/components/alojamiento-conjunto';
import NeonatalAttention from './well-child-care/components/neonatal-attention/neonatal-attention.component';
import NeonatalCounseling from './well-child-care/components/neonatal-counseling/neonatal-consuling.component';
import NeonatalEvaluation from './well-child-care/components/neonatal-evaluation/neonatal-evaluation.component';

// Neonatal Register Components
import PregnancyBirthTable from './well-child-care/components/neonatal-register/detalles-embarazo/pregnancy-table.component';
import BirthDataTable from './well-child-care/components/neonatal-register/detalles-nacimiento/birth-date.component';
import LabourHistory from './well-child-care/components/neonatal-register/labour-history/labour-history.component';

// Newborn Monitoring Components
import NewbornBalanceOverview from './well-child-care/components/newborn-monitoring/newborn balance/balance-overview.component';
import NewbornBiometricsBase from './well-child-care/components/newborn-monitoring/newborn biometrics/biometrics-base.component';

// Vaccination Components
import VaccinationSchedule from './well-child-care/components/vaccination-schema-widget/vaccinationSchedule.component';
import { AdverseReactionForm } from './well-child-care/workspace/adverse-reaction/adverseReaction.component';

//Change this to a custom component, add an interface to reuse it!
import ChildMedicalHistory from './ui/conditions-filter/conditions-overview.component';

// ================================================================================
// SOCIAL HISTORY DOMAIN
// ================================================================================

// TEPSI FORM

// ODONTOGRAM
// import Odontogram from './ui/workspace/odontogram/odontogram.component';

// ================================================================================
// EXPORTS SETUP
// ================================================================================
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@pucp-gidis-hiisc/esm-sihsalus-app';
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
// CASE MANAGEMENT EXPORTS
// ================================================================================
export const caseEncounterDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...caseEncounterDashboardMeta, moduleName }),
  options,
);
export const caseEncounterTable = getSyncLifecycle(CaseEncounterOverviewComponent, options);
export const caseManagementDashboardLink = getSyncLifecycle(createLeftPanelLink(caseManagementDashboardMeta), options);
export const caseManagementForm = getSyncLifecycle(CaseManagementForm, options);
export const endRelationshipWorkspace = getSyncLifecycle(EndRelationshipWorkspace, options);
export const wrapComponent = getSyncLifecycle(WrapComponent, options);

// ================================================================================
// CLINICAL ENCOUNTERS EXPORTS
// ================================================================================
export const clinicalViewPatientDashboard = getSyncLifecycle(ClinicalViewSection, options);
export const inPatientClinicalEncounter = getSyncLifecycle(ClinicalEncounterDashboard, options);

// ================================================================================
// CONTACT LIST EXPORTS
// ================================================================================
export const birthDateCalculator = getSyncLifecycle(BirthDateCalculator, options);
export const contactList = getSyncLifecycle(ContactList, options);
export const contactListForm = getSyncLifecycle(ContactListForm, options);
export const contactListLink = getSyncLifecycle(
  createDashboardLink({ ...contactListDashboardMeta, moduleName }),
  options,
);

// ================================================================================
// FAMILY HISTORY EXPORTS
// ================================================================================
export const familyHistory = getSyncLifecycle(FamilyHistory, options);
export const familyHistoryLink = getSyncLifecycle(
  createDashboardLink({ ...familyHistoryDashboardMeta, moduleName }),
  options,
);
export const familyRelationshipForm = getSyncLifecycle(FamilyRelationshipForm, options);

// ================================================================================
// FUA REQUEST EXPORTS
// ================================================================================
export const fuaRequestDashboardLink = getSyncLifecycle(createLeftPanelLink(FuaRequestDashboardMeta), options);
export const fuaRequestTable = getSyncLifecycle(FuaRequestTable, options);

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

// Labour & Delivery Components (alphabetical)
export const deliberyOrAbortionTable = getSyncLifecycle(DeliberyOrAbortionTable, options);
export const partograph = getSyncLifecycle(Partograph, options);
export const summaryOfLaborAndPostpartumTable = getSyncLifecycle(SummaryOfLaborAndPostpartumTable, options);

// Obstetric History
export const obstetricHistoryChart = getSyncLifecycle(ObstetricHistoryBase, options);

// Postnatal Care Components (alphabetical)
export const immediatePostpartumTable = getSyncLifecycle(ImmediatePostpartumTable, options);
export const postpartumControlTable = getSyncLifecycle(PostpartumControlTable, options);

// Prenatal Care Components (alphabetical)
export const currentPregnancyTable = getSyncLifecycle(CurrentPregnancyTable, options);
export const maternalHistoryTable = getSyncLifecycle(MaternalHistoryTable, options);
export const prenatalCareChart = getSyncLifecycle(PrenatalCareChart, options);

// ================================================================================
// OTHER RELATIONSHIPS EXPORTS
// ================================================================================
export const otherRelationships = getSyncLifecycle(OtherRelationships, options);
export const otherRelationshipsForm = getSyncLifecycle(OtherRelationshipsForm, options);
export const otherRelationshipsLink = getSyncLifecycle(
  createDashboardLink({ ...otherRelationshipsDashboardMeta, moduleName }),
  options,
);

// ================================================================================
// RELATIONSHIPS EXPORTS
// ================================================================================
export const relationshipDeleteConfirmialog = getSyncLifecycle(DeleteRelationshipConfirmDialog, options);
export const relationships = getSyncLifecycle(Relationships, options);
export const relationshipUpdateForm = getSyncLifecycle(RelationshipUpdateForm, options);
export const relationshipsLink = getSyncLifecycle(
  createDashboardLink({ ...relationshipsDashboardMeta, moduleName }),
  options,
);

// ================================================================================
// SPECIALIZED CLINICS EXPORTS
// ================================================================================
export const specialClinicsSideNavGroup = getSyncLifecycle(createDashboardGroup(specialClinicsNavGroup), options);

// Generic Components
export const genericDashboard = getSyncLifecycle(GenericDashboard, options);
export const genericNavLinks = getSyncLifecycle(GenericNavLinks, options);

// HIV Care & Treatment
export const hivCareAndTreatMentSideNavGroup = getSyncLifecycle(
  createDashboardGroup(hivCareAndTreatmentNavGroup),
  options,
);
export const defaulterTracing = getSyncLifecycle(DefaulterTracing, options);
export const defaulterTracingLink = getSyncLifecycle(
  createDashboardLink({ ...defaulterTracingDashboardMeta, moduleName }),
  options,
);
export const htsClinicalView = getSyncLifecycle(HivTestingEncountersList, options);
export const htsDashboardLink = getSyncLifecycle(createDashboardLink({ ...htsDashboardMeta, moduleName }), options);

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

// CRED Controls (alphabetical)
export const credCheckouts = getSyncLifecycle(CredControlsCheckout, options);
export const credControls = getSyncLifecycle(CredControlsTimeline, options);
export const credControlsMatrix = getSyncLifecycle(CredControlsMatrix, options);

// Neonatal Components (alphabetical)
export const childMedicalHistory = getSyncLifecycle(ChildMedicalHistory, options);
export const neonatalAttentionChart = getSyncLifecycle(NeonatalAttention, options);
export const neonatalCounselingChart = getSyncLifecycle(NeonatalCounseling, options);
export const neonatalEvaluationChart = getSyncLifecycle(NeonatalEvaluation, options);
export const neonatalRegisterChart = getSyncLifecycle(LabourHistory, options);
export const neonatalRegisterBirth = getSyncLifecycle(BirthDataTable, options);
export const pregnancyDetails = getSyncLifecycle(PregnancyBirthTable, options);
export const alojamientoConjunto = getSyncLifecycle(AlojamientoConjunto, options);
// Newborn Monitoring (alphabetical)
export const newbornBalanceOverviewChart = getSyncLifecycle(NewbornBalanceOverview, options);
export const newbornBiometricsBaseChart = getSyncLifecycle(NewbornBiometricsBase, options);

// Vaccination Components (alphabetical)
export const vaccinationAppointment = getSyncLifecycle(AdverseReactionForm, options);
export const vaccinationSchedule = getSyncLifecycle(VaccinationSchedule, options);

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

export const dyakuPatientsLink = getAsyncLifecycle(
  () => import('./dyaku-patients/dyaku-patients-link.component'),
  options,
);

export const dyakuPatientsPage = getAsyncLifecycle(() => import('./immunization-plan/testeo.component'), options);
export const wellchildControlsworkspace = getAsyncLifecycle(
  () => import('./well-child-care/workspace/well-child-control/well-child-controls-form.workspace'),
  options,
);

//TO add to routes.json
export const conditionsFilterWorkspace = getAsyncLifecycle(
  () => import('./ui/conditions-filter/conditions-form.workspace'),
  options,
);

export const conditionFilterDeleteConfirmationDialog = getAsyncLifecycle(
  () => import('./ui/conditions-filter/delete-condition.modal'),
  options,
);

// ================================================================================
// GENERIC CONDITIONS COMPONENTS
// ================================================================================
export const genericConditionsOverview = getAsyncLifecycle(
  () => import('./ui/conditions-filter/generic-conditions-overview.component'),
  options,
);

// ================================================================================
// SOCIAL HISTORY EXPORTS
// ================================================================================

export const socialHistoryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...socialHistoryDashboardMeta, moduleName }),
  options,
);

// ================================================================================
// ANTECEDENTES PATOLÓGICOS (WELL CHILD CARE)
// ================================================================================
export const antecedentesPatologicos = getAsyncLifecycle(
  () => import('./well-child-care/antecedentes-patologicos.component'),
  options,
);

export const antecedentesPatologicosFormWorkspace = getAsyncLifecycle(
  () => import('./well-child-care/antecedentes-patologicos-form.workspace'),
  options,
);

// ================================================================================
// FORMS SELECTOR (GENERIC WORKSPACE)
// ================================================================================
export const formsSelectorWorkspace = getAsyncLifecycle(
  () => import('./ui/forms-selector/forms-selector.workspace'),
  options,
);
