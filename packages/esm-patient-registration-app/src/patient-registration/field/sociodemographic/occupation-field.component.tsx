import React from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';

export function OccupationField() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();

  const fieldDefinition = {
    id: 'occupation',
    type: 'person attribute',
    uuid: config.fieldConfigurations.occupation.personAttributeUuid,
    validation: config.fieldConfigurations.occupation.validation,
    showHeading: false,
    label: t('occupation', 'Ocupación'),
  };

  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
