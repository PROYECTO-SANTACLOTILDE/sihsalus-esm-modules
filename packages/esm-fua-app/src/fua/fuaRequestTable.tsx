import React, { useState, useMemo, useCallback } from 'react';
import {
  DataTable,
  DataTableSkeleton,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
  Layer,
  Tile,
  Button,
  OverflowMenu,
  OverflowMenuItem,
  Tag,
} from '@carbon/react';
import { View } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { formatDate, usePagination, launchWorkspace, showModal } from '@openmrs/esm-framework';
import useFuaRequests, { type FuaRequest } from '../hooks/useFuaRequests';
import { FuaDateRangePicker } from './fua-date-range-picker.component';
import styles from './fua-request-table.scss';

interface FuaRequestTableProps {
  statusFilter?: string;
}

type TagType = 'blue' | 'cyan' | 'gray' | 'green' | 'magenta' | 'red' | 'teal' | 'warm-gray' | 'cool-gray' | 'high-contrast' | 'outline';

const estadoTagType: Record<string, TagType> = {
  'Pendiente': 'gray',
  'En Proceso': 'blue',
  'Completado': 'green',
  'Enviado a SETI-SIS': 'cyan',
  'Rechazado': 'red',
  'Cancelado': 'magenta',
};

const FuaRequestTable: React.FC<FuaRequestTableProps> = ({ statusFilter = 'all' }) => {
  const { t } = useTranslation();

  const { fuaOrders, isLoading, isError, mutate } = useFuaRequests({
    status: statusFilter !== 'all' ? statusFilter : null,
    excludeCanceled: true,
  });

  const [searchString, setSearchString] = useState('');

  const filteredData = useMemo(() => {
    if (!fuaOrders) return [];

    let filtered = fuaOrders;

    if (searchString) {
      const search = searchString.toLowerCase();
      filtered = filtered.filter(req =>
        req.name?.toLowerCase().includes(search) ||
        req.uuid?.toLowerCase().includes(search) ||
        req.fuaEstado?.nombre?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [fuaOrders, searchString]);

  const pageSizes = [10, 20, 30, 40, 50];
  const [currentPageSize, setPageSize] = useState(10);
  const { results, goTo, currentPage } = usePagination(filteredData ?? [], currentPageSize);

  const handleViewFua = useCallback((fuaId: string) => {
    launchWorkspace('fua-viewer-workspace', { fuaId });
  }, []);

  const handleChangeStatus = useCallback((fuaRequest: FuaRequest) => {
    const dispose = showModal('change-fua-status-modal', {
      fuaRequest,
      onStatusChanged: () => {
        mutate();
      },
      closeModal: () => dispose(),
    });
  }, [mutate]);

  const handleCancelFua = useCallback((fuaRequest: FuaRequest) => {
    const dispose = showModal('cancel-fua-modal', {
      fuaRequest,
      onCancelled: () => {
        mutate();
      },
      closeModal: () => dispose(),
    });
  }, [mutate]);

  const headers = [
    { key: 'name', header: t('fuaName', 'Nombre del FUA') },
    { key: 'estado', header: t('status', 'Estado') },
    { key: 'visitUuid', header: t('visitUuid', 'UUID de la Visita') },
    { key: 'fechaCreacion', header: t('creationDate', 'Fecha de Creación') },
    { key: 'fechaActualizacion', header: t('updateDate', 'Fecha de Actualización') },
    { key: 'actions', header: t('actions', 'Acciones') },
  ];

  const rows = results?.map((request: FuaRequest, index: number) => ({
    id: String(index),
    name: request.name || 'N/A',
    estado: request.fuaEstado?.nombre || t('noStatus', 'Sin estado'),
    visitUuid: request.visitUuid || 'N/A',
    fechaCreacion: formatDate(new Date(request.fechaCreacion), { mode: 'standard' }),
    fechaActualizacion: formatDate(new Date(request.fechaActualizacion), { mode: 'standard' }),
    actions: request,
  })) ?? [];

  if (isLoading) {
    return <DataTableSkeleton role="progressbar" showHeader={false} showToolbar={false} />;
  }

  return (
    <div className={styles.tableContainer}>
      <DataTable rows={rows} headers={headers} isSortable useZebraStyles size="sm">
        {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
          <TableContainer className={styles.tableContainer}>
            <TableToolbar>
              <TableToolbarContent className={styles.toolbarContent}>
                <Layer className={styles.toolbarItem}>
                  <FuaDateRangePicker />
                </Layer>
                <Layer className={styles.toolbarItem}>
                  <TableToolbarSearch
                    expanded
                    onChange={(e) => {
                      if (typeof e === 'string') {
                        setSearchString(e);
                      } else {
                        setSearchString(e.target.value);
                      }
                    }}
                    placeholder={t('searchThisList', 'Buscar en esta lista')}
                    size="sm"
                  />
                </Layer>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()} className={styles.table}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                      className={styles.tableHeader}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => {
                  const fuaRequest = results[rowIndex];
                  return (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id} className={styles.tableCell}>
                          {cell.info.header === 'estado' ? (
                            <Tag type={estadoTagType[cell.value] || 'gray'} size="sm">
                              {cell.value}
                            </Tag>
                          ) : cell.info.header === 'actions' ? (
                            <div className={styles.actionsCell}>
                              <Button
                                kind="ghost"
                                size="sm"
                                renderIcon={View}
                                iconDescription={t('viewFua', 'Ver FUA')}
                                hasIconOnly
                                onClick={() => handleViewFua(fuaRequest.uuid)}
                                tooltipPosition="left"
                              />
                              <OverflowMenu size="sm" flipped ariaLabel={t('actions', 'Acciones')}>
                                <OverflowMenuItem
                                  itemText={t('changeStatus', 'Cambiar Estado')}
                                  onClick={() => handleChangeStatus(fuaRequest)}
                                />
                                <OverflowMenuItem
                                  itemText={t('cancelFua', 'Cancelar FUA')}
                                  onClick={() => handleCancelFua(fuaRequest)}
                                  isDelete
                                  hasDivider
                                />
                              </OverflowMenu>
                            </div>
                          ) : (
                            cell.value
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {rows.length === 0 ? (
              <div className={styles.tileContainer}>
                <Tile className={styles.tile}>
                  <div className={styles.tileContent}>
                    <p className={styles.content}>{t('noFuaRequestsFound', 'No se encontraron solicitudes FUA')}</p>
                    <p className={styles.emptyStateHelperText}>
                      {t('checkFilters', 'Por favor revisa los filtros de arriba e intenta de nuevo')}
                    </p>
                  </div>
                </Tile>
              </div>
            ) : null}
          </TableContainer>
        )}
      </DataTable>
      {filteredData.length > 0 && (
        <Pagination
          page={currentPage}
          pageSize={currentPageSize}
          pageSizes={pageSizes}
          totalItems={filteredData.length}
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setPageSize(pageSize);
            }
            goTo(page);
          }}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default FuaRequestTable;
