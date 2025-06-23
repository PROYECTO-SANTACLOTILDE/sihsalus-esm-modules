import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function OdontogramNavLink() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to={`${window.spaBase}/odontogram`}>
      {t('odontogram', 'Odontograma')}
    </ConfigurableLink>
  );
}
