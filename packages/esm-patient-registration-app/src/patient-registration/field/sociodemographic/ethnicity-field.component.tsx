import React, { useMemo } from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';

export function EthnicityField() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();

  const fieldDefinition = useMemo(
    () => ({
      id: 'ethnicity',
      type: 'person attribute',
      uuid: config.fieldConfigurations.ethnicity.personAttributeUuid,
      answerConceptSetUuid: config.fieldConfigurations.ethnicity.answerConceptSetUuid,
      validation: config.fieldConfigurations.ethnicity.validation,
      showHeading: false,
      label: t('ethnicity', 'Ethnicity'),
    }),
    [config.fieldConfigurations.ethnicity, t],
  );

  return <PersonAttributeField fieldDefinition={fieldDefinition} useComboBox={true} />;
}
