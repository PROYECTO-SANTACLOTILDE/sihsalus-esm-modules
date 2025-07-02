import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function EducationLevelField() {
  const config = useConfig<RegistrationConfig>();

  const fieldDefinition = {
    id: 'educationLevel',
    type: 'person attribute',
    uuid: config.fieldConfigurations.educationLevel.personAttributeUuid,
    answerConceptSetUuid: config.fieldConfigurations.educationLevel.answerConceptSetUuid,
    validation: config.fieldConfigurations.educationLevel.validation,
    showHeading: false,
    label: 'Education Level',
  };

  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
