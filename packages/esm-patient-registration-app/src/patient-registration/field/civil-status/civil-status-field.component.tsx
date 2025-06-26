import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useField } from 'formik';
import { Layer, Select, SelectItem } from '@carbon/react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useConfig, reportError } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';
import { usePatientRegistrationContext } from '../../patient-registration-context';
import { usePersonAttributeType } from '../person-attributes/person-attributes.resource';
import { useConceptAnswers } from '../field.resource';
import styles from '../field.scss';

export function CivilStatusField() {
  const { t } = useTranslation();
  const config = useConfig<RegistrationConfig>();
  const { setFieldValue } = usePatientRegistrationContext();
  const [{ value: birthdate }] = useField('birthdate');
  const [{ value: yearsEstimated }] = useField('yearsEstimated');
  const [{ value: birthdateEstimated }] = useField('birthdateEstimated');

  const fieldName = `attributes.${config.fieldConfigurations.civilStatus.personAttributeUuid}`;
  const [civilStatusField, civilStatusMeta] = useField(fieldName);

  const { data: personAttributeType, isLoading: isLoadingAttributeType } = usePersonAttributeType(
    config.fieldConfigurations.civilStatus.personAttributeUuid,
  );

  const { data: conceptAnswers, isLoading: isLoadingConceptAnswers } = useConceptAnswers(
    config.fieldConfigurations.civilStatus.answerConceptSetUuid,
  );

  // Calculate age from birthdate or estimated age
  const age = useMemo(() => {
    if (birthdateEstimated && yearsEstimated) {
      return yearsEstimated;
    }
    if (birthdate) {
      return dayjs().diff(dayjs(birthdate), 'years');
    }
    return null;
  }, [birthdate, birthdateEstimated, yearsEstimated]);

  // Check if patient is under marriageable age
  const isUnderMarriageableAge = useMemo(() => {
    return age !== null && age < config.fieldConfigurations.civilStatus.marriageableAge;
  }, [age, config.fieldConfigurations.civilStatus.marriageableAge]);

  // Auto-set civil status to single for minors
  useEffect(() => {
    if (isUnderMarriageableAge) {
      setFieldValue(fieldName, config.fieldConfigurations.civilStatus.singleConceptUuid);
    }
  }, [isUnderMarriageableAge, setFieldValue, fieldName, config.fieldConfigurations.civilStatus.singleConceptUuid]);

  const answers = useMemo(() => {
    return isLoadingConceptAnswers || !conceptAnswers
      ? []
      : conceptAnswers
          .map((answer) => ({ ...answer, label: answer.display }))
          .sort((a, b) => a.label.localeCompare(b.label));
  }, [conceptAnswers, isLoadingConceptAnswers]);

  if (isLoadingAttributeType || isLoadingConceptAnswers) {
    return <div>Cargando...</div>;
  }

  if (!personAttributeType || !conceptAnswers) {
    return <div>Error al cargar estado civil</div>;
  }

  return (
    <div className={classNames(styles.customField, styles.halfWidthInDesktopView)}>
      <Layer>
        <Select
          id="civilStatus"
          name={`person-attribute-${config.fieldConfigurations.civilStatus.personAttributeUuid}`}
          labelText="Estado Civil"
          invalid={!!(civilStatusMeta.touched && civilStatusMeta.error)}
          required={config.fieldConfigurations.civilStatus.validation?.required ?? false}
          disabled={isUnderMarriageableAge}
          {...civilStatusField}>
          <SelectItem value="" text={t('selectAnOption', 'Seleccione una opción')} />
          {answers.map((answer) => (
            <SelectItem key={answer.uuid} value={answer.uuid} text={answer.label} />
          ))}
        </Select>
      </Layer>
      {isUnderMarriageableAge && (
        <p
          style={{
            fontSize: '0.75rem',
            color: '#6f6f6f',
            marginTop: '0.25rem',
            fontStyle: 'italic',
          }}>
          Automáticamente configurado como "soltero" para menores de{' '}
          {config.fieldConfigurations.civilStatus.marriageableAge} años
        </p>
      )}
    </div>
  );
}
