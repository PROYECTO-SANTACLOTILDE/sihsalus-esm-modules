import React, { useState } from 'react';
import {
  Button,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
  Tile,
  TextInput,
  NumberInput,
  InlineNotification,
  Loading,
  Modal,
} from '@carbon/react';
import { Add, TrashCan, Play, Renew } from '@carbon/react/icons';
import { showSnackbar } from '@openmrs/esm-framework';
import { useIndicatorsCRUD, useEvaluateIndicator } from './hooks/useIndicators';
import type { IndicatorDefinition } from './hooks/useIndicators';
import styles from './indicators-dashboard.module.scss';

const IndicatorsDashboard: React.FC = () => {
  const { indicators, isLoading, error, create, remove, refresh } = useIndicatorsCRUD();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [evaluatingId, setEvaluatingId] = useState<number | null>(null);

  // Create form state
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newConceptIds, setNewConceptIds] = useState('');
  const [newMinAge, setNewMinAge] = useState<number>(0);
  const [newMaxAge, setNewMaxAge] = useState<number>(120);

  const handleCreate = async () => {
    try {
      const conceptIds = newConceptIds
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));

      await create({
        name: newName,
        description: newDescription,
        conceptIds,
        minAge: newMinAge,
        maxAge: newMaxAge,
        active: true,
      });

      showSnackbar({ title: 'Indicador creado', kind: 'success', isLowContrast: true });
      setShowCreateModal(false);
      setNewName('');
      setNewDescription('');
      setNewConceptIds('');
      setNewMinAge(0);
      setNewMaxAge(120);
    } catch (e: any) {
      showSnackbar({ title: 'Error al crear', subtitle: e.message, kind: 'error', isLowContrast: true });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
      showSnackbar({ title: 'Indicador eliminado', kind: 'success', isLowContrast: true });
    } catch (e: any) {
      showSnackbar({ title: 'Error al eliminar', subtitle: e.message, kind: 'error', isLowContrast: true });
    }
  };

  const headers = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'description', header: 'Descripción' },
    { key: 'conceptIds', header: 'Concepts' },
    { key: 'ageRange', header: 'Rango Edad' },
    { key: 'active', header: 'Estado' },
    { key: 'actions', header: 'Acciones' },
  ];

  const rows = indicators.map((ind) => ({
    id: String(ind.id),
    name: ind.name,
    description: ind.description || '-',
    conceptIds: (ind.conceptIds ?? []).join(', ') || '-',
    ageRange: `${ind.minAge ?? 0} - ${ind.maxAge ?? 120}`,
    active: ind.active ? 'Activo' : 'Inactivo',
  }));

  if (isLoading) {
    return (
      <Tile className={styles.container}>
        <Loading withOverlay={false} description="Cargando indicadores..." />
      </Tile>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Indicadores Clínicos - Panel de Prueba</h2>
        <div className={styles.headerActions}>
          <Button kind="ghost" renderIcon={Renew} onClick={() => refresh()}>
            Refrescar
          </Button>
          <Button renderIcon={Add} onClick={() => setShowCreateModal(true)}>
            Crear Indicador
          </Button>
        </div>
      </div>

      {error && (
        <InlineNotification
          kind="error"
          title="Error de conexión"
          subtitle={`No se pudo conectar al OMOD de indicators. ¿Está instalado? Error: ${error.message}`}
        />
      )}

      {!error && indicators.length === 0 && (
        <Tile className={styles.empty}>
          <p>No hay indicadores definidos aún. Crea uno para probar la conexión.</p>
        </Tile>
      )}

      {indicators.length > 0 && (
        <DataTable rows={rows} headers={headers}>
          {({ rows: tableRows, headers: tableHeaders, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableHeader key={header.key} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows.map((row) => {
                  const indicator = indicators.find((i) => String(i.id) === row.id);
                  return (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => {
                        if (cell.info.header === 'active') {
                          return (
                            <TableCell key={cell.id}>
                              <Tag type={cell.value === 'Activo' ? 'green' : 'red'}>{cell.value}</Tag>
                            </TableCell>
                          );
                        }
                        if (cell.info.header === 'actions') {
                          return (
                            <TableCell key={cell.id}>
                              <Button
                                kind="ghost"
                                size="sm"
                                renderIcon={Play}
                                onClick={() => setEvaluatingId(indicator?.id ?? null)}
                              >
                                Evaluar
                              </Button>
                              <Button
                                kind="danger--ghost"
                                size="sm"
                                renderIcon={TrashCan}
                                onClick={() => indicator && handleDelete(indicator.id)}
                              >
                                Eliminar
                              </Button>
                            </TableCell>
                          );
                        }
                        return <TableCell key={cell.id}>{cell.value}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </DataTable>
      )}

      {/* Evaluation Result */}
      {evaluatingId != null && <EvaluationPanel id={evaluatingId} onClose={() => setEvaluatingId(null)} />}

      {/* Create Modal */}
      <Modal
        open={showCreateModal}
        modalHeading="Crear Indicador de Prueba"
        primaryButtonText="Crear"
        secondaryButtonText="Cancelar"
        onRequestClose={() => setShowCreateModal(false)}
        onRequestSubmit={handleCreate}
      >
        <div className={styles.form}>
          <TextInput
            id="ind-name"
            labelText="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextInput
            id="ind-desc"
            labelText="Descripción"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <TextInput
            id="ind-concepts"
            labelText="Concept IDs (separados por coma)"
            placeholder="1234, 5678"
            value={newConceptIds}
            onChange={(e) => setNewConceptIds(e.target.value)}
          />
          <NumberInput
            id="ind-min-age"
            label="Edad mínima"
            value={newMinAge}
            min={0}
            max={120}
            onChange={(_e, { value }) => setNewMinAge(Number(value))}
          />
          <NumberInput
            id="ind-max-age"
            label="Edad máxima"
            value={newMaxAge}
            min={0}
            max={120}
            onChange={(_e, { value }) => setNewMaxAge(Number(value))}
          />
        </div>
      </Modal>
    </div>
  );
};

/** Sub-panel para mostrar resultado de evaluación */
const EvaluationPanel: React.FC<{ id: number; onClose: () => void }> = ({ id, onClose }) => {
  const { patientCount, indicatorName, isLoading, error } = useEvaluateIndicator(id);

  return (
    <Tile className={styles.evaluation}>
      <h4>Resultado de Evaluación</h4>
      {isLoading && <Loading withOverlay={false} small description="Evaluando..." />}
      {error && (
        <InlineNotification kind="error" title="Error" subtitle={error.message} lowContrast />
      )}
      {!isLoading && !error && (
        <div>
          <p>
            <strong>{indicatorName}</strong>
          </p>
          <p>
            Pacientes encontrados: <Tag type="blue">{patientCount}</Tag>
          </p>
        </div>
      )}
      <Button kind="ghost" size="sm" onClick={onClose}>
        Cerrar
      </Button>
    </Tile>
  );
};

export default IndicatorsDashboard;
