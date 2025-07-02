import React, { useMemo } from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';

export function ReligiousAffiliationField() {
  const config = useConfig<RegistrationConfig>();

  const fieldDefinition = useMemo(
    () => ({
      id: 'religiousAffiliation',
      type: 'person attribute',
      uuid: config.fieldConfigurations.religiousAffiliation.personAttributeUuid,
      answerConceptSetUuid: config.fieldConfigurations.religiousAffiliation.answerConceptSetUuid,
      validation: config.fieldConfigurations.religiousAffiliation.validation,
      showHeading: false,
      label: 'Religious Affiliation',
    }),
    [config.fieldConfigurations.religiousAffiliation],
  );

  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
