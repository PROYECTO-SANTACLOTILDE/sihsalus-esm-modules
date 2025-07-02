import React, { useMemo } from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';

export function EducationLevelField() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();

  const fieldDefinition = useMemo(
    () => ({
      id: 'educationLevel',
      type: 'person attribute',
      uuid: config.fieldConfigurations.educationLevel.personAttributeUuid,
      answerConceptSetUuid: config.fieldConfigurations.educationLevel.answerConceptSetUuid,
      validation: config.fieldConfigurations.educationLevel.validation,
      showHeading: false,
      label: t('educationLevel', 'Education Level'),
    }),
    [config.fieldConfigurations.educationLevel, t],
  );

  return <PersonAttributeField fieldDefinition={fieldDefinition} useComboBox={true} />;
}
