import React, { useState, useMemo } from 'react';
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
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDate, usePagination } from '@openmrs/esm-framework';
import useFuaRequests from '../hooks/useFuaRequests';
import { FuaDateRangePicker } from './fua-date-range-picker.component';
import styles from './fua-request-table.scss';

interface FuaRequestTableProps {
  statusFilter?: string;
}

const FuaRequestTable: React.FC<FuaRequestTableProps> = ({ statusFilter = 'all' }) => {
  const { t } = useTranslation();

  // Use the refactored hook with status filtering
  const { fuaOrders, isLoading, isError } = useFuaRequests({
    status: statusFilter !== 'all' ? statusFilter : null,
    excludeCanceled: true,
  });

  const [searchString, setSearchString] = useState('');

  // Apply search filter only (status filtering is now done by the hook)
  const filteredData = useMemo(() => {
    if (!fuaOrders) return [];

    let filtered = fuaOrders;

    // Apply search filter
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

  const headers = [
    { key: 'name', header: t('fuaName', 'Nombre del FUA') },
    { key: 'estado', header: t('status', 'Estado') },
    { key: 'uuid', header: t('fuaUuid', 'UUID del FUA') },
    { key: 'visitUuid', header: t('visitUuid', 'UUID de la Visita') },
    { key: 'fechaCreacion', header: t('creationDate', 'Fecha de Creación') },
    { key: 'fechaActualizacion', header: t('updateDate', 'Fecha de Actualización') },
  ];

  const rows = results?.map((request: any, index: number) => ({
    id: String(index),
    name: request.name || 'N/A',
    estado: request.fuaEstado?.nombre || 'N/A',
    uuid: request.uuid,
    visitUuid: request.visitUuid || 'N/A',
    fechaCreacion: formatDate(new Date(request.fechaCreacion), { mode: 'standard' }),
    fechaActualizacion: formatDate(new Date(request.fechaActualizacion), { mode: 'standard' }),
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
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id} className={styles.tableCell}>
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
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
