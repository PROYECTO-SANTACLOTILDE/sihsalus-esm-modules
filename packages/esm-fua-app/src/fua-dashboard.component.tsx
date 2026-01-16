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

  return (
    <div className={styles.dashboard}>
      <PageHeader
        illustration={<DocumentBlank size={32} />}
        title={t('fua', 'Formato Único de Atención')}
        className={styles.pageHeader}
      />
      <FuaSummaryTiles />
      <FuaOrdersTabs />
    </div>
  );
};

export default FuaDashboard;
