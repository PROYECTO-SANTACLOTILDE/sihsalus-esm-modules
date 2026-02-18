import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTableHeader,
  DataTableRow,
  TableContainer,
  Button,
  Pagination,
} from '@carbon/react';
import { TrashCan, Edit } from '@carbon/react/icons';
import React from 'react';
import { CostStructure, Procedure } from '../../../types';

interface IRow {
  code: string;
  name: string;
  created_date: string;
  id: string;
  end_date: string;
  start_date: string;
}

interface CostStructureT extends CostStructure {
  procedure: Procedure;
}
const headers: DataTableHeader[] = [
  { key: 'code', header: 'Código' },
  { key: 'name', header: 'Nombre del procedimiento' },
  { key: 'created_date', header: 'Fecha creada' },
  { key: 'start_date', header: 'Fecha Inicio' },
  { key: 'end_date', header: 'Fecha Actualizacion' },
  { key: 'actions', header: 'Acciones' },
];
interface HomeTableProps {
  data: CostStructureT[];
}
const HomeTable: React.FC<HomeTableProps> = ({ data }) => {
  const rows: IRow[] = data.map((cs, index) => ({
    id: cs.uuid ?? String(index),
    code: cs.procedure?.conceptId?.toString() ?? `PROC-${index + 1}`,
    name: cs.procedure?.name ?? 'Sin procedimiento',
    created_date: new Date(cs.createdDate).toLocaleDateString('es-PE'),
    end_date: new Date(cs.endDate).toLocaleDateString('es-PE'),
    start_date: new Date(cs.startDate).toLocaleDateString('es-PE'),
  }));
  return (
    <>
      <DataTable rows={rows} headers={headers}>
        {({ getTableProps, getHeaderProps, getRowProps, getCellProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <HomeTableRow key={row.id} row={row} getRowProps={getRowProps} getCellProps={getCellProps} />
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </>
  );
};
interface HomeTableRowProps {
  row: IRow;
  getRowProps: any;
  getCellProps: any;
}
const HomeTableRow: React.FC<HomeTableRowProps> = ({ row, getRowProps, getCellProps }) => {
  return (
    <TableRow key={row.id} {...getRowProps({ row })}>
      <TableCell {...getCellProps({ cell: { id: `${row.id}-code` } })}>{row.code}</TableCell>
      <TableCell {...getCellProps({ cell: { id: `${row.id}-name` } })}>{row.name}</TableCell>
      <TableCell {...getCellProps({ cell: { id: `${row.id}-created` } })}>{row.created_date}</TableCell>
      <TableCell {...getCellProps({ cell: { id: `${row.id}-start` } })}>{row.start_date}</TableCell>
      <TableCell {...getCellProps({ cell: { id: `${row.id}-end` } })}>{row.end_date}</TableCell>
      <TableCell {...getCellProps({ cell: { id: `${row.id}-actions` } })}>
        <div>
          <Edit size={20} style={{ cursor: 'pointer' }} onClick={() => console.log('Editar', row.id)} />
          <TrashCan size={20} style={{ cursor: 'pointer' }} onClick={() => console.log('Eliminar', row.id)} />
        </div>
      </TableCell>
    </TableRow>
  );
};
export default HomeTable;
