import React, { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Field, useField } from 'formik';
import { type PersonAttributeTypeResponse } from '../../patient-registration.types';
import styles from './../field.scss';
import { useLocations } from './location-person-attribute-field.resource';
import { ComboBox, InlineLoading, Layer } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@openmrs/esm-framework';

export interface LocationPersonAttributeFieldProps {
  id: string;
  personAttributeType: PersonAttributeTypeResponse;
  label?: string;
  locationTag: string;
  required?: boolean;
}

export function LocationPersonAttributeField({
  personAttributeType,
  id,
  label,
  locationTag,
  required,
}: LocationPersonAttributeFieldProps) {
  const { t } = useTranslation();
  const fieldName = `attributes.${personAttributeType.uuid}`;
  const [field, meta, { setValue }] = useField(`attributes.${personAttributeType.uuid}`);
  const [searchQuery, setSearchQuery] = useState('');

  // Optimización: Debounce local para evitar búsquedas excesivas
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { locations, isLoading, loadingNewData } = useLocations(locationTag || null, debouncedSearchQuery);
  const prevLocationOptions = useRef([]);

  // Optimización: Memoizar las opciones de ubicación y limitar resultados
  const locationOptions = useMemo(() => {
    if (!(isLoading && loadingNewData)) {
      const newOptions = locations
        .slice(0, 20) // Limitar a 20 resultados para mejor rendimiento
        .map(({ resource: { id, name } }) => ({ value: id, label: name }));
      prevLocationOptions.current = newOptions;
      return newOptions;
    }
    return prevLocationOptions.current;
  }, [locations, isLoading, loadingNewData]);

  const selectedItem = useMemo(() => {
    if (typeof meta.value === 'string') {
      return locationOptions.find(({ value }) => value === meta.value) || null;
    }
    if (typeof meta.value === 'object' && meta.value) {
      return locationOptions.find(({ value }) => value === meta.value.uuid) || null;
    }
    return null;
  }, [locationOptions, meta.value]);

  // Optimización: Memoizar el manejador de cambio de input
  const handleInputChange = useCallback(
    (value: string | null) => {
      if (value) {
        // Si el valor existe en locationOptions (es decir, una etiqueta coincide con la entrada), salir de la función
        if (locationOptions.find(({ label }) => label === value)) return;
        // Solo actualizar si es diferente del valor actual para evitar renders innecesarios
        if (value !== searchQuery) {
          setSearchQuery(value);
        }
        // Limpiar el valor seleccionado actual ya que la entrada no coincide con ninguna opción existente
        setValue(null);
      }
    },
    [locationOptions, setValue, searchQuery],
  );

  // Optimización: Memoizar el manejador de selección
  const handleSelect = useCallback(
    ({ selectedItem }) => {
      if (selectedItem) {
        setValue(selectedItem.value);
      }
    },
    [setValue],
  );

  return (
    <div
      className={classNames(styles.customField, styles.halfWidthInDesktopView, styles.locationAttributeFieldContainer)}>
      <Layer>
        <Field name={fieldName}>
          {({ field, form: { touched, errors } }) => {
            return (
              <ComboBox
                id={id}
                name={`person-attribute-${personAttributeType.uuid}`}
                titleText={label}
                items={locationOptions}
                placeholder={t('searchLocationPersonAttribute', 'Search location')}
                onInputChange={handleInputChange}
                required={required}
                onChange={handleSelect}
                selectedItem={selectedItem}
                invalid={errors[fieldName] && touched[fieldName]}
                typeahead
              />
            );
          }}
        </Field>
      </Layer>
      {loadingNewData && (
        <div className={styles.loadingContainer}>
          <InlineLoading />
        </div>
      )}
    </div>
  );
}
