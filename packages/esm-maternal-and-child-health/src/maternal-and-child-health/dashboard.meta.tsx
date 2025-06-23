export const prenatalDashboardMeta = {
  icon: 'omrs-icon-baby',
  slot: 'patient-chart-prenatal-dashboard-slot',
  title: 'Cuidados Prenatales',
  path: 'prenatal-care-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-sihsalus-app',
  config: {},
};

export const labourAndDeliveryDashboardMeta = {
  icon: 'omrs-icon-hospital-bed',
  slot: 'patient-chart-labour-and-delivery-dashboard-slot',
  title: 'Atención del Parto',
  path: 'labour-and-delivery-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-sihsalus-app',
  config: {},
};

export const postnatalDashboardMeta = {
  icon: 'omrs-icon-mother',
  slot: 'patient-chart-postnatal-dashboard-slot',
  title: 'Puerperio',
  path: 'postnatal-care-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-sihsalus-app',
  config: {},
};

export const maternalAndChildHealthNavGroup = {
  title: 'Madre Gestante',
  slotName: 'maternal-and-child-health-slot',
  isExpanded: true,
  showWhenExpression:
    'patient.gender === "female" && (enrollment.includes("Madre Gestante") || enrollment.includes("Otras Estrategias Obstetricas"))',
};
