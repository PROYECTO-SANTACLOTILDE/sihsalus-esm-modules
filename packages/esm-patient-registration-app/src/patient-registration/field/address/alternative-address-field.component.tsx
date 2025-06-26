import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentSwitcher, Switch } from '@carbon/react';
import { useField } from 'formik';
import { useConfig } from '@openmrs/esm-framework';
import { type RegistrationConfig } from '../../../config-schema';
import { usePatientRegistrationContext } from '../../patient-registration-context';
import { AddressComponent } from './address-field.component';
import styles from '../field.scss';

export const AlternativeAddressField = () => {
  const { t } = useTranslation();
  const { setFieldValue, setFieldTouched } = usePatientRegistrationContext();
  const config = useConfig<RegistrationConfig>();

  // Campo para controlar si la dirección actual coincide con la registrada
  const [{ value: addressMatchesValue }, , { setValue: setAddressMatches }] = useField<boolean>('addressMatches');

  // Por defecto, asumimos que las direcciones coinciden (true)
  const addressesMatch = addressMatchesValue !== false;

  const toggleAddressMatch = useCallback(
    (e) => {
      const matches = e.name === 'yes';
      setAddressMatches(matches);

      if (matches) {
        // Si las direcciones coinciden, limpiar los campos de dirección alternativa
        setFieldValue('alternativeAddress', {});
      }

      setFieldTouched('addressMatches', true, false);
    },
    [setAddressMatches, setFieldValue, setFieldTouched],
  );

  const alternativeAddressComponent = useMemo(() => {
    if (addressesMatch) {
      return null;
    }

    // Renderizar el componente de dirección alternativa cuando no coinciden
    return (
      <div style={{ marginTop: '1rem' }}>
        <h5 className={styles.productiveHeading02Light}>{t('alternativeAddressHeader', 'Dirección Alternativa')}</h5>
        <AddressComponent fieldPrefix="alternativeAddress" />
      </div>
    );
  }, [addressesMatch, t]);

  return (
    <div>
      <h4 className={styles.productiveHeading02Light}>{t('addressInformationHeader', 'Datos de Domicilio RENIEC')}</h4>

      <div className={styles.grid}>
        <div className={styles.nameField}>
          <div className={styles.dobContentSwitcherLabel}>
            <span className={styles.label01}>
              {t('currentAddressMatches', '¿La dirección actual coincide con la dirección registrada?')}
            </span>
          </div>

          <ContentSwitcher
            className={styles.contentSwitcher}
            selectedIndex={addressesMatch ? 0 : 1}
            onChange={toggleAddressMatch}>
            <Switch name="yes" text={t('yes', 'Sí')} />
            <Switch name="no" text={t('no', 'No')} />
          </ContentSwitcher>

          {/* Componente de dirección alternativa condicional */}
          {alternativeAddressComponent}
        </div>
      </div>
    </div>
  );
};
