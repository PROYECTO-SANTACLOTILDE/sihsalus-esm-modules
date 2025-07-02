import React, { useMemo } from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function EducationLevelField() {
  const config = useConfig<RegistrationConfig>();

  const fieldDefinition = useMemo(
    () => ({
      id: 'educationLevel',
      type: 'person attribute',
      uuid: config.fieldConfigurations.educationLevel.personAttributeUuid,
      answerConceptSetUuid: config.fieldConfigurations.educationLevel.answerConceptSetUuid,
      validation: config.fieldConfigurations.educationLevel.validation,
      showHeading: false,
      label: 'Education Level',
    }),
    [config.fieldConfigurations.educationLevel],
  );

  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
