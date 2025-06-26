// email-field.component.tsx
import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function EmailField() {
  const config = useConfig<RegistrationConfig>();

  const fieldDefinition = {
    id: 'email',
    type: 'person attribute',
    uuid: config.fieldConfigurations.email.personAttributeUuid,
    validation: config.fieldConfigurations.email.validation,
    showHeading: false,
  };
  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
