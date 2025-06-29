import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddressEntries, useAddressEntryFetchConfig } from './address-hierarchy.resource';
import { useField } from 'formik';
import ComboInput from '../../input/combo-input/combo-input.component';

interface AddressComboBoxProps {
  attribute: {
    id: string;
    name: string;
    value: string;
    label: string;
    required?: boolean;
  };
  fieldPrefix?: string;
}

interface AddressHierarchyLevelsProps {
  orderedAddressFields: Array<any>;
  fieldPrefix?: string;
}

const AddressComboBox: React.FC<AddressComboBoxProps> = ({ attribute, fieldPrefix = 'address' }) => {
  const { t } = useTranslation();
  const [field, meta, { setValue }] = useField(`${fieldPrefix}.${attribute.name}`);
  const { fetchEntriesForField, searchString, updateChildElements } = useAddressEntryFetchConfig(attribute.name);
  const { entries } = useAddressEntries(fetchEntriesForField, searchString);
  const label = t(attribute.label) + (attribute?.required ? '' : ` (${t('optional', 'optional')})`);

  const handleInputChange = useCallback(
    (newValue) => {
      setValue(newValue);
    },
    [setValue],
  );

  const handleSelection = useCallback(
    (selectedItem) => {
      if (meta.value !== selectedItem) {
        setValue(selectedItem);
        updateChildElements();
      }
    },
    [updateChildElements, meta.value, setValue],
  );

  return (
    <ComboInput
      entries={entries}
      handleSelection={handleSelection}
      name={`${fieldPrefix}.${attribute.name}`}
      fieldProps={{
        ...field,
        id: attribute.name,
        labelText: label,
        required: attribute?.required,
      }}
      handleInputChange={handleInputChange}
    />
  );
};

const AddressHierarchyLevels: React.FC<AddressHierarchyLevelsProps> = ({
  orderedAddressFields,
  fieldPrefix = 'address',
}) => {
  return (
    <>
      {orderedAddressFields.map((attribute) => (
        <AddressComboBox key={attribute.id} attribute={attribute} fieldPrefix={fieldPrefix} />
      ))}
    </>
  );
};

export default AddressHierarchyLevels;
