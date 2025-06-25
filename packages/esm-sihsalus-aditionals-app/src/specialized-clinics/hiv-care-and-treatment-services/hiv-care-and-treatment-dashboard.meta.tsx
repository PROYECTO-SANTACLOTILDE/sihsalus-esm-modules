export const htsDashboardMeta = {
  icon: 'hts',
  slot: 'patient-chart-hts-dashboard-slot',
  columns: 1,
  title: 'HIV Testing Services',
  path: 'hts-dashboard',
};
export const defaulterTracingDashboardMeta = {
  icon: 'defaulter-tracing',
  slot: 'patient-chart-defaulter-tracing-dashboard-slot',
  columns: 1,
  title: 'Defaulter Tracing',
  path: 'defaulter-tracing-dashboard',
};

export const hivCareAndTreatmentNavGroup = {
  icon: 'hiv-care-and-treatment',
  title: 'HIV Care & Treatment',
  slotName: 'hiv-care-and-treatment-slot',
  isExpanded: false,
  isChild: true,
  showWhenExpression: "enrollment.includes('HIV')",
};
