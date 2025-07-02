import React, { useMemo } from 'react';
import { PersonAttributeField } from '../person-attributes/person-attribute-field.component';
import { useConfig } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import { type RegistrationConfig } from '../../../config-schema';

export function ReligiousAffiliationField() {
  const config = useConfig<RegistrationConfig>();
  const { t } = useTranslation();

  const fieldDefinition = useMemo(
    () => ({
      id: 'religiousAffiliation',
      type: 'person attribute',
      uuid: config.fieldConfigurations.religiousAffiliation.personAttributeUuid,
      answerConceptSetUuid: config.fieldConfigurations.religiousAffiliation.answerConceptSetUuid,
      validation: config.fieldConfigurations.religiousAffiliation.validation,
      showHeading: false,
      label: t('religiousAffiliation', 'Religious Affiliation'),
    }),
    [config.fieldConfigurations.religiousAffiliation, t],
  );

  return <PersonAttributeField fieldDefinition={fieldDefinition} useComboBox={true} />;
}
