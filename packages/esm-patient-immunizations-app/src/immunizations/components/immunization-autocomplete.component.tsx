import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { TextInput } from '@carbon/react';
import { Search } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type OpenmrsConcept } from '../../types/fhir-immunization-domain';
import styles from './immunization-autocomplete.scss';

interface ImmunizationAutocompleteProps {
  immunizationsConceptSet: OpenmrsConcept;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  placeholder?: string;
  titleText?: string;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ImmunizationAutocomplete: React.FC<ImmunizationAutocompleteProps> = ({
  immunizationsConceptSet,
  value,
  onChange,
  disabled = false,
  invalid = false,
  invalidText = '',
  placeholder,
  titleText,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get the display text for the selected value
  const selectedItem = useMemo(() => {
    return immunizationsConceptSet?.answers?.find((item) => item.uuid === value);
  }, [immunizationsConceptSet, value]);

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!immunizationsConceptSet?.answers) return [];

    if (!debouncedSearchTerm.trim()) {
      return immunizationsConceptSet.answers;
    }

    return immunizationsConceptSet.answers.filter((item) =>
      item.display.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [immunizationsConceptSet, debouncedSearchTerm]);

  // Handle item selection
  const handleItemSelect = useCallback(
    (item: OpenmrsConcept) => {
      onChange(item.uuid);
      setSearchTerm('');
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onChange],
  );

  // Handle input change
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, []);

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === 'ArrowDown' || event.key === 'Enter') {
          setIsOpen(true);
          return;
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && filteredItems[highlightedIndex]) {
            handleItemSelect(filteredItems[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
          inputRef.current?.blur();
          break;
        case 'Tab':
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, filteredItems, highlightedIndex, handleItemSelect],
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear search term when closing
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const displayValue = searchTerm || selectedItem?.display || '';

  return (
    <div className={styles.autocompleteContainer} ref={containerRef}>
      <div className={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          id="immunization-autocomplete"
          placeholder={placeholder || t('searchImmunizations', 'Search immunizations...')}
          labelText={titleText || t('immunization', 'Immunization')}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          invalid={invalid}
          invalidText={invalidText}
          autoComplete="off"
          size="md"
        />
        <Search className={styles.searchIcon} size={16} />
      </div>

      {isOpen && !disabled && (
        <div className={styles.dropdownContainer}>
          <ul className={styles.optionsList} role="listbox">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={item.uuid}
                  className={`${styles.option} ${
                    index === highlightedIndex ? styles.highlighted : ''
                  } ${item.uuid === value ? styles.selected : ''}`}
                  onClick={() => handleItemSelect(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  role="option"
                  aria-selected={item.uuid === value}>
                  {item.display}
                </li>
              ))
            ) : (
              <li className={styles.noResults}>{t('noImmunizationsFound', 'No immunizations found')}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImmunizationAutocomplete;
