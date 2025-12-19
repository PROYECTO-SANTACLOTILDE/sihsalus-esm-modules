import React, { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableContainer,
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useFuaRequests from '../hooks/useFuaRequests';
import { ClaimManagementHeader } from './case-management-header';
import styles from './fua-request-table.scss';

const FuaRequestTable: React.FC = () => {
  const { data, isLoading, error, generateFua } = useFuaRequests();

  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleExpand = (index: number) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };

  const renderJsonAsTable = (obj: any): JSX.Element => {
    if (typeof obj !== 'object' || obj === null) {
      return <span>{String(obj)}</span>;
    }

    return (
      <table className={styles.jsonTable}>
        <tbody>
          {Object.entries(obj).map(([key, value], idx) => (
            <tr key={idx} className={styles.jsonRow}>
              <td className={styles.jsonKey}>{key}</td>
              <td className={styles.jsonValue}>
                {typeof value === 'object' ? renderJsonAsTable(value) : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (isLoading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const headers = [
    { key: 'name', header: 'Nombre del FUA' },
    { key: 'estado', header: 'Estado' },
    { key: 'uuid', header: 'UUID del FUA' },
    { key: 'visitUuid', header: 'UUID de la Visita' },
    { key: 'fechaCreacion', header: 'Fecha de Creación' },
    { key: 'fechaActualizacion', header: 'Fecha de Actualización' },
    { key: 'payload', header: 'Payload' },
  ];

  const rows =
    data?.map((request: any, index: number) => ({
      id: String(index),
      name: request.name || 'N/A',
      estado: request.fuaEstado?.nombre || 'N/A',
      uuid: request.uuid,
      visitUuid: request.visitUuid || 'N/A',
      fechaCreacion: new Date(request.fechaCreacion).toLocaleString(),
      fechaActualizacion: new Date(request.fechaActualizacion).toLocaleString(),
      payload: request.payload,
    })) ?? [];

  return (
    <div className="omrs-main-content">
      <ClaimManagementHeader title={t('fuaRequests', 'Solicitudes FUA')} />
      <TableContainer>
        <DataTable rows={rows} headers={headers} isSortable={false} size="sm">
          {({ rows, headers, getHeaderProps, getRowProps }) => (
            <Table>
              <TableHead>
                <TableRow>
                  <TableExpandHeader />
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                      className={`${styles.productiveHeading01} ${styles.text02}`}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <React.Fragment key={row.id}>
                    <TableExpandRow
                      {...getRowProps({ row })}
                      onExpand={() => toggleExpand(index)}
                      isExpanded={expandedRowIndex === index}>
                      {row.cells.map((cell) => {
                        if (cell.info.header === 'payload') {
                          return (
                            <TableCell key={cell.id} className={styles.payloadCell}>
                              <button
                                className={styles.payloadButton}
                                onClick={async (e) => {
                                  e.stopPropagation();

                                  const visitUuid = data[index].visitUuid;

                                  try {
                                    const html = await generateFua(visitUuid);

                                    // Convertimos el HTML a un Blob
                                    const blob = new Blob([html], { type: "text/html" });

                                    // Creamos una URL temporal del Blob
                                    const url = URL.createObjectURL(blob);

                                    // Abrimos en nueva pestaña
                                    window.open(url, "_blank");

                                  } catch (err) {
                                    console.error("Error generando FUA:", err);
                                    alert("No se pudo generar el FUA");
                                  }
                                }}>
                                Mostrar FUA
                              </button>
                            </TableCell>
                          );
                        }
                        return <TableCell key={cell.id}>{cell.value}</TableCell>;
                      })}
                    </TableExpandRow>
                    {expandedRowIndex === index && (
                      <TableExpandedRow colSpan={headers.length + 1}>
                        <div className={styles.payloadExpandedContent}>
                          {(() => {
                            const payload = data?.[index]?.payload;
                            if (!payload) return <div>No hay datos de payload</div>;
                            try {
                              const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
                              return renderJsonAsTable(parsed);
                            } catch (err) {
                              return <div>Payload inválido o no es JSON</div>;
                            }
                          })()}
                        </div>
                      </TableExpandedRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      </TableContainer>
    </div>
  );
};

export default FuaRequestTable;
