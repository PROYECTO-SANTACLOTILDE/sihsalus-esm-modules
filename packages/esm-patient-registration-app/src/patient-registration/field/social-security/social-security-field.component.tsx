import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function SocialSecurityField() {
  const config = useConfig<RegistrationConfig>();

  const fieldDefinition = {
    id: 'socialSecurity',
    type: 'person attribute',
    uuid: config.fieldConfigurations.socialSecurity.personAttributeUuid,
    answerConceptSetUuid: config.fieldConfigurations.socialSecurity.answerConceptSetUuid,
    validation: config.fieldConfigurations.socialSecurity.validation,
    showHeading: false,
  };

  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
