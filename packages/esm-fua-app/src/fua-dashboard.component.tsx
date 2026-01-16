import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { PageHeader, useDefineAppContext } from '@openmrs/esm-framework';
import { DocumentBlank } from '@carbon/react/icons';
import { type DateFilterContext } from './types';
import FuaOrdersTabs from './fua-tabs/fua-tabs.component';
import FuaSummaryTiles from './fua-tiles/fua-summary-tiles.component';
import styles from './fua-dashboard.scss';

const FuaDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<Date[]>([dayjs().startOf('day').toDate(), new Date()]);
  useDefineAppContext<DateFilterContext>('fua-date-filter', { dateRange, setDateRange });

  console.log('=== FUA DASHBOARD DEBUG ===');
  console.log('Dashboard rendering...');

  return (
    <div style={{ border: '3px solid red', padding: '10px' }}>
      <div style={{ backgroundColor: 'pink', padding: '10px' }}>
        <h1>DEBUG: HEADER SECTION</h1>
        <PageHeader
          illustration={<DocumentBlank size={32} />}
          title={t('fua', 'Formato Único de Atención')}
          className={styles.pageHeader}
        />
      </div>
      <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
        <h2>DEBUG: TILES SECTION</h2>
        <FuaSummaryTiles />
      </div>
      <div style={{ backgroundColor: 'lightgreen', padding: '10px' }}>
        <h2>DEBUG: TABS SECTION</h2>
        <FuaOrdersTabs />
      </div>
    </div>
  );
};

export default FuaDashboard;
