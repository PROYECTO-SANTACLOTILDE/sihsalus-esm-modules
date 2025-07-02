import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';
import { ComboBox, Layer, IconButton } from '@carbon/react';
import { Close } from '@carbon/react/icons';
import { reportError } from '@openmrs/esm-framework';
import { useConceptAnswers } from '../field.resource';
import styles from './../field.scss';
import type { PersonAttributeTypeResponse } from '../../patient-registration.types';

export interface CodedComboPersonAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  answerConceptSetUuid: string;
  label?: string;
  customConceptAnswers: Array<{ uuid: string; label?: string }>;
  required: boolean;
}

export function CodedComboPersonAttributeField({
  id,
  personAttributeType,
  answerConceptSetUuid,
  label,
  customConceptAnswers,
  required,
}: CodedComboPersonAttributeFieldProps) {
  const { data: conceptAnswers, isLoading: isLoadingConceptAnswers } = useConceptAnswers(
    customConceptAnswers.length ? '' : answerConceptSetUuid,
  );

  const { t } = useTranslation();
  const fieldName = `attributes.${personAttributeType.uuid}`;
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!answerConceptSetUuid && !customConceptAnswers.length) {
      reportError(
        t(
          'codedPersonAttributeNoAnswerSet',
          `The person attribute field '{{codedPersonAttributeFieldId}}' is of type 'coded' but has been defined without an answer concept set UUID.`,
          { codedPersonAttributeFieldId: id },
        ),
      );
      setError(true);
    }
  }, [answerConceptSetUuid, customConceptAnswers, id, t]);

  useEffect(() => {
    if (!isLoadingConceptAnswers && !customConceptAnswers.length) {
      if (!conceptAnswers) {
        reportError(
          t(
            'codedPersonAttributeAnswerSetInvalid',
            `The coded person attribute field '{{codedPersonAttributeFieldId}}' has an invalid or empty answer concept set UUID '{{answerConceptSetUuid}}'.`,
            { codedPersonAttributeFieldId: id, answerConceptSetUuid },
          ),
        );
        setError(true);
      } else if (conceptAnswers.length === 0) {
        setError(true);
      }
    }
  }, [isLoadingConceptAnswers, conceptAnswers, customConceptAnswers, t, id, answerConceptSetUuid]);

  const items = useMemo(() => {
    if (error) return [];

    return customConceptAnswers.length > 0
      ? customConceptAnswers.map((a) => ({ id: a.uuid, text: a.label || 'Unknown' }))
      : (conceptAnswers ?? []).map((a) => ({ id: a.uuid, text: a.display || 'Unknown' }));
  }, [customConceptAnswers, conceptAnswers, error]);

  if (error) {
    return null;
  }

  return (
    <div className={classNames(styles.customField, styles.halfWidthInDesktopView)} style={{ marginTop: '1rem' }}>
      {!isLoadingConceptAnswers ? (
        <Layer>
          <Field name={fieldName}>
            {({ field, form: { setFieldValue, touched, errors } }) => {
              const selectedId = field.value ?? null;
              const selectedItem = items.find((i) => i.id === selectedId) ?? null;

              return (
                <>
                  <ComboBox
                    id={id}
                    items={items}
                    selectedItem={selectedItem}
                    itemToString={(item) => (item ? item.text : '')}
                    placeholder={t('selectAnOption', 'Select an option')}
                    titleText={label ?? personAttributeType.display}
                    invalid={Boolean(errors[fieldName] && touched[fieldName])}
                    invalidText={errors[fieldName] as string}
                    onChange={({ selectedItem }) => setFieldValue(fieldName, selectedItem ? selectedItem.id : '')}
                    shouldFilterItem={({ item, inputValue = '' }) => {
                      if (!item?.text || !inputValue) return true;
                      return item.text.toLowerCase().includes(inputValue.toLowerCase());
                    }}
                    size="md"
                  />
                </>
              );
            }}
          </Field>
        </Layer>
      ) : null}
    </div>
  );
}
