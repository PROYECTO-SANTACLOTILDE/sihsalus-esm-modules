export const prenatalDashboardMeta = {
  icon: 'omrs-icon-baby',
  slot: 'patient-chart-prenatal-dashboard-slot',
  title: 'Cuidados Prenatales',
  path: 'prenatal-care-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-maternal-and-child-health-app',
  config: {},
} as const;

export const labourAndDeliveryDashboardMeta = {
  icon: 'omrs-icon-hospital-bed',
  slot: 'patient-chart-labour-and-delivery-dashboard-slot',
  title: 'Atención del Parto',
  path: 'labour-and-delivery-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-maternal-and-child-health-app',
  config: {},
} as const;

export const postnatalDashboardMeta = {
  icon: 'omrs-icon-mother',
  slot: 'patient-chart-postnatal-dashboard-slot',
  title: 'Puerperio',
  path: 'postnatal-care-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-maternal-and-child-health-app',
  config: {},
} as const;

export const familyPlanningDashboardMeta = {
  icon: 'omrs-icon-pedestrian-family',
  slot: 'patient-chart-family-planning-dashboard-slot',
  title: 'Planificación Familiar',
  path: 'family-planning-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-maternal-and-child-health-app',
  config: {},
} as const;

export const cancerPreventionDashboardMeta = {
  icon: 'omrs-icon-microscope',
  slot: 'patient-chart-cancer-prevention-dashboard-slot',
  title: 'Prevención del Cáncer',
  path: 'cancer-prevention-dashboard',
  moduleName: '@pucp-gidis-hiisc/esm-maternal-and-child-health-app',
  config: {},
} as const;

export const maternalAndChildHealthNavGroup = {
  title: 'Madre Gestante',
  slotName: 'maternal-and-child-health-slot',
  isExpanded: true,
  showWhenExpression:
    'patient.gender === "female" && (enrollment.includes("Madre Gestante") || enrollment.includes("Otras Estrategias Obstetricas"))',
};
