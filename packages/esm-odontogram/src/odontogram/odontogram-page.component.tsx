import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Tile } from '@carbon/react';

const OdontogramPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="omrs-main-content">
      <Layer>
        <Tile>
          <h1>{t('odontogram', 'Odontograma')}</h1>
          <p>{t('odontogramDescription', 'Sistema de odontograma para registro dental')}</p>
          {/* TODO: Implementar componente de odontograma */}
          <div style={{ padding: '2rem', textAlign: 'center', background: '#f4f4f4' }}>
            <p>{t('comingSoon', 'Próximamente - Funcionalidad en desarrollo')}</p>
          </div>
        </Tile>
      </Layer>
    </div>
  );
};

export default OdontogramPage;
