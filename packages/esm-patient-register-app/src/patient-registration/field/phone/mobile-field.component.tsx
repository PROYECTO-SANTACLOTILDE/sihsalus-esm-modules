// mobile-field.component.tsx
import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function MobileField() {
  const config = useConfig<RegistrationConfig>();

  const fieldDefinition = {
    id: 'mobile',
    type: 'person attribute',
    uuid: config.fieldConfigurations.mobile.personAttributeUuid,
    validation: config.fieldConfigurations.mobile.validation,
    showHeading: false,
  };
  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
