import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function EthnicityField() {
  const config = useConfig<RegistrationConfig>();

  const fieldDefinition = {
    id: 'ethnicity',
    type: 'person attribute',
    uuid: config.fieldConfigurations.ethnicity.personAttributeUuid,
    answerConceptSetUuid: config.fieldConfigurations.ethnicity.answerConceptSetUuid,
    validation: config.fieldConfigurations.ethnicity.validation,
    showHeading: false,
    label: 'Ethnicity',
  };

  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
