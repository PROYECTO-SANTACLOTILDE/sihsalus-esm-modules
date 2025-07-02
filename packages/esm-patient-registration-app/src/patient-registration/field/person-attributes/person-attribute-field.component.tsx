import React, { useMemo } from 'react';
import { InlineNotification, TextInputSkeleton } from '@carbon/react';
import { type FieldDefinition } from '../../../config-schema';
import { CodedPersonAttributeField } from './coded-person-attribute-field.component';
import { CodedComboPersonAttributeField } from './combo-person-attribute-field.component';
import { usePersonAttributeType } from './person-attributes.resource';
import { TextPersonAttributeField } from './text-person-attribute-field.component';
import { useTranslation } from 'react-i18next';
import styles from '../field.scss';
import { LocationPersonAttributeField } from './location-person-attribute-field.component';

export interface PersonAttributeFieldProps {
  fieldDefinition: FieldDefinition;
  useComboBox?: boolean; // Nueva prop para alternar entre componentes
}

export function PersonAttributeField({ fieldDefinition, useComboBox = false }: PersonAttributeFieldProps) {
  const { data: personAttributeType, isLoading, error } = usePersonAttributeType(fieldDefinition.uuid);
  const { t } = useTranslation();

  const personAttributeField = useMemo(() => {
    if (!personAttributeType) {
      return null;
    }
    switch (personAttributeType.format) {
      case 'java.lang.String':
        return (
          <TextPersonAttributeField
            personAttributeType={personAttributeType}
            validationRegex={fieldDefinition.validation?.matches ?? ''}
            invalidText={fieldDefinition.validation?.invalidText ?? ''}
            label={fieldDefinition.label}
            required={fieldDefinition.validation?.required ?? false}
            id={fieldDefinition?.id}
          />
        );
      case 'org.openmrs.Concept':
        return useComboBox ? (
          <CodedComboPersonAttributeField
            personAttributeType={personAttributeType}
            answerConceptSetUuid={fieldDefinition.answerConceptSetUuid}
            label={fieldDefinition.label}
            id={fieldDefinition?.id}
            customConceptAnswers={fieldDefinition.customConceptAnswers ?? []}
            required={fieldDefinition.validation?.required ?? false}
          />
        ) : (
          <CodedPersonAttributeField
            personAttributeType={personAttributeType}
            answerConceptSetUuid={fieldDefinition.answerConceptSetUuid}
            label={fieldDefinition.label}
            id={fieldDefinition?.id}
            customConceptAnswers={fieldDefinition.customConceptAnswers ?? []}
            required={fieldDefinition.validation?.required ?? false}
          />
        );
      case 'org.openmrs.Location':
        return (
          <LocationPersonAttributeField
            personAttributeType={personAttributeType}
            locationTag={fieldDefinition.locationTag}
            label={fieldDefinition.label}
            id={fieldDefinition?.id}
            required={fieldDefinition.validation?.required ?? false}
          />
        );
      default:
        return (
          <InlineNotification kind="error" title="Error">
            {t(
              'unknownPatientAttributeType',
              'Patient attribute type has unknown format {{personAttributeTypeFormat}}',
              {
                personAttributeTypeFormat: personAttributeType.format,
              },
            )}
          </InlineNotification>
        );
    }
  }, [personAttributeType, fieldDefinition, t, useComboBox]);

  if (isLoading) {
    return (
      <div>
        {fieldDefinition.showHeading && <h4 className={styles.productiveHeading02Light}>{fieldDefinition?.label}</h4>}
        <TextInputSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {fieldDefinition.showHeading && <h4 className={styles.productiveHeading02Light}>{fieldDefinition?.label}</h4>}
        <InlineNotification kind="error" title={t('error', 'Error')}>
          {t('unableToFetch', 'Unable to fetch person attribute type - {{personattributetype}}', {
            personattributetype: fieldDefinition?.label ?? fieldDefinition?.id,
          })}
        </InlineNotification>
      </div>
    );
  }

  return (
    <div>
      {fieldDefinition.showHeading && (
        <h4 className={styles.productiveHeading02Light}>{fieldDefinition?.label ?? personAttributeType?.display}</h4>
      )}
      {personAttributeField}
    </div>
  );
}
