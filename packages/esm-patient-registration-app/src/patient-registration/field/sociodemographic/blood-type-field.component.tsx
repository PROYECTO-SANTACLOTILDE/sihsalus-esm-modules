import React, { useMemo } from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';

export function BloodTypeField() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();

  const fieldDefinition = {
    id: 'bloodType',
    type: 'person attribute',
    uuid: config.fieldConfigurations.bloodType.personAttributeUuid,
    answerConceptSetUuid: config.fieldConfigurations.bloodType.answerConceptSetUuid,
    validation: config.fieldConfigurations.bloodType.validation,
    showHeading: false,
    label: t('bloodType', 'Blood Type'),
  };

  return <PersonAttributeField fieldDefinition={fieldDefinition} />;
}
