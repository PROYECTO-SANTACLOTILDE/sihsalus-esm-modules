/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Router } from './routes/router';
const RootComponent: React.FC = () => {
  const { t } = useTranslation();
  const navName = 'cost-structure-left-panel-slot';
  return <Router />;
};

export default RootComponent;
