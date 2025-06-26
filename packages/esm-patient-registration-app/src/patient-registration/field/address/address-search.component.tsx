import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { Search } from '@carbon/react';
import { useAddressHierarchy } from './address-hierarchy.resource';
import { useDebounce } from '@openmrs/esm-framework';
import styles from './address-search.scss';

interface AddressSearchComponentProps {
  addressLayout: Array<any>;
  fieldPrefix?: string;
}

const AddressSearchComponent: React.FC<AddressSearchComponentProps> = ({ addressLayout, fieldPrefix = 'address' }) => {
  const { t } = useTranslation();
  const separator = ' > ';
  const searchBox = useRef(null);
  const wrapper = useRef(null);
  const [searchString, setSearchString] = useState('');

  // Optimización: Debounce para evitar búsquedas excesivas
  const debouncedSearchString = useDebounce(searchString, 500);

  const { addresses } = useAddressHierarchy(debouncedSearchString, separator);

  // Optimización: Limitar el número de opciones mostradas y memoizar
  const addressOptions: Array<string> = useMemo(() => {
    if (debouncedSearchString.trim().length < 2 || addresses.length === 0) {
      return [];
    }

    const options: Set<string> = new Set();
    const maxResults = 20; // Limitar resultados para mejor rendimiento

    for (const address of addresses) {
      if (options.size >= maxResults) break;

      const values = address.split(separator);
      for (let index = 0; index < values.length; index++) {
        if (options.size >= maxResults) break;

        const val = values[index];
        if (val.toLowerCase().includes(debouncedSearchString.toLowerCase())) {
          options.add(values.slice(0, index + 1).join(separator));
        }
      }
    }

    return Array.from(options).slice(0, maxResults);
  }, [addresses, debouncedSearchString, separator]);

  const { setFieldValue } = useFormikContext();

  // Optimización: Memoizar el manejador de cambio de input
  const handleInputChange = useCallback((e) => {
    setSearchString(e.target.value);
  }, []);

  // Optimización: Memoizar el manejador de selección
  const handleChange = useCallback(
    (address) => {
      if (address) {
        const values = address.split(separator);
        addressLayout.forEach(({ name }, index) => {
          setFieldValue(`${fieldPrefix}.${name}`, values?.[index] ?? '');
        });
        setSearchString('');
      }
    },
    [addressLayout, separator, setFieldValue, fieldPrefix],
  );

  // Optimización: Memoizar el manejador de click fuera del componente
  const handleClickOutsideComponent = useCallback((e) => {
    if (wrapper.current && !wrapper.current.contains(e.target)) {
      setSearchString('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideComponent);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideComponent);
    };
  }, [handleClickOutsideComponent]);

  return (
    <div className={styles.autocomplete} ref={wrapper} style={{ marginBottom: '1rem' }}>
      <Search
        onChange={handleInputChange}
        labelText={t('searchAddress', 'Search address')}
        placeholder={t('searchAddress', 'Search address')}
        ref={searchBox}
        value={searchString}
      />
      {addressOptions.length > 0 && (
        /* Since the input has a marginBottom of 1rem */
        <ul className={styles.suggestions}>
          {addressOptions.map((address, index) => (
            <li key={index} onClick={(e) => handleChange(address)}>
              {address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressSearchComponent;
