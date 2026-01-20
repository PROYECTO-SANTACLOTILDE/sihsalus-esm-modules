import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFuaRequests } from '../hooks/useFuaRequests';
import FuaSummaryTile from '../components/summary-tiles/summary-tile.component';


const InProgressFuaRequestsTile = () => {
  const { t } = useTranslation();
  const { fuaOrders } = useFuaRequests({ status: 'IN_PROGRESS' });

  return (
    <FuaSummaryTile
      label={t('inProgress', 'In progress')}
      value={fuaOrders?.length}
      headerLabel={t('worklist', 'Ex-Worklist')}
    />
  );
};

export default InProgressFuaRequestsTile;
