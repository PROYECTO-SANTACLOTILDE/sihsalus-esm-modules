import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFuaRequests } from '../hooks/useFuaRequests';
import FuaSummaryTile from '../components/summary-tiles/summary-tile.component';

const AllFuaRequestsTile = () => {
  const { t } = useTranslation();

  const { fuaOrders } = useFuaRequests({ newOrdersOnly: true });

  return (
    <FuaSummaryTile
      label={t('orders', 'Orders')}
      value={fuaOrders?.length}
      headerLabel={t('testsOrdered', 'Tests ordered')}
    />
  );
};

export default AllFuaRequestsTile;
