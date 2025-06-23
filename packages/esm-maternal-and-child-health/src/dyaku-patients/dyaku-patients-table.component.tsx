import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import { useLayoutType, usePagination } from '@openmrs/esm-framework';
import { PatientChartPagination } from '@openmrs/esm-patient-common-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DyakuPatientSyncButton from './dyaku-patient-sync-button.component';
import DyakuPatientsSync from './dyaku-patients-sync.component';
import styles from './dyaku-patients-table.scss';
import { useDyakuPatients, useDyakuPatientsByIdentifier } from './dyaku-patients.resource';

interface DyakuPatientsTableProps {
  pageSize?: number;
  searchDni?: string;
}

const DyakuPatientsTable: React.FC<DyakuPatientsTableProps> = ({ pageSize = 10, searchDni }) => {
  const { t } = useTranslation();
  const isTablet = useLayoutType() === 'tablet';

  // Determinar si estamos en modo búsqueda
  const isSearchMode = searchDni && searchDni.trim().length >= 8;

  // Usar búsqueda por DNI si se proporciona, otherwise usar lista completa
  const {
    data: allPatients,
    error: allPatientsError,
    isLoading: isLoadingAll,
    mutate: mutateAll,
  } = useDyakuPatients(undefined, pageSize);

  const {
    data: searchResults,
    error: searchError,
    isLoading: isSearching,
    mutate: mutateSearch,
  } = useDyakuPatientsByIdentifier(searchDni || '');

  // Usar datos según el modo
  const patients = isSearchMode ? searchResults : allPatients;
  const error = isSearchMode ? searchError : allPatientsError;
  const isLoading = isSearchMode ? isSearching : isLoadingAll;
  const mutate = isSearchMode ? mutateSearch : mutateAll;

  const tableHeaders = [
    { key: 'dni', header: t('dni', 'DNI') },
    { key: 'firstName', header: t('firstName', 'Nombres') },
    { key: 'lastName', header: t('lastName', 'Apellidos') },
    { key: 'gender', header: t('gender', 'Género') },
    { key: 'birthDate', header: t('birthDate', 'Fecha de Nacimiento') },
    { key: 'email', header: t('email', 'Email') },
    { key: 'phone', header: t('phone', 'Teléfono') },
    { key: 'actions', header: t('actions', 'Acciones') },
  ];

  const tableRows = patients
    ? patients.map((patient, index) => ({
        id: patient.id || `patient-${index}`,
        dni: patient.identifier?.[0]?.value || '-',
        firstName: patient.name?.[0]?.given?.join(' ') || '-',
        lastName: patient.name?.[0]?.family || '-',
        gender: patient.gender === 'female' ? 'Femenino' : patient.gender === 'male' ? 'Masculino' : '-',
        birthDate: patient.birthDate || '-',
        email: patient.telecom?.find((t) => t.system === 'email')?.value || '-',
        phone: patient.telecom?.find((t) => t.system === 'phone')?.value || '-',
        actions: patient, // Pasamos el objeto completo del paciente para el botón
      }))
    : [];

  const { results: paginatedData, goTo, currentPage } = usePagination(tableRows, pageSize);

  // Si estamos en modo búsqueda y no hay resultados, no mostrar nada
  if (isSearchMode && (!patients || patients.length === 0) && !isLoading && !error) {
    return null;
  }

  const handleSyncComplete = () => {
    // Refrescar los datos después de la sincronización
    mutate();
  };

  const handleIndividualSyncComplete = () => {
    // Refrescar los datos después de sincronización individual
    mutate();
  };

  if (isLoading) {
    return <div className={styles.loadingState}>{t('loading', 'Cargando pacientes...')}</div>;
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        {t('errorLoadingPatients', 'Error al cargar los pacientes: {{error}}', { error: error.message })}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div>
            <h2 className={styles.title}>
              {isSearchMode
                ? t('dyakuPatientsSearchTitle', 'Resultados de búsqueda - Pacientes FHIR Dyaku MINSA')
                : t('dyakuPatientsTitle', 'Pacientes FHIR - Dyaku MINSA')}
            </h2>
            <p className={styles.subtitle}>
              {isSearchMode
                ? t(
                    'dyakuPatientsSearchSubtitle',
                    'Resultados para DNI: {{dni}} ({{total}} paciente(s) encontrado(s))',
                    {
                      dni: searchDni,
                      total: patients?.length || 0,
                    },
                  )
                : t('dyakuPatientsSubtitle', 'Lista de pacientes registrados en el sistema FHIR del MINSA')}
            </p>
          </div>
          <div className={styles.headerActions}>
            <DyakuPatientsSync onSyncComplete={handleSyncComplete} />
          </div>
        </div>
      </div>

      <DataTable rows={paginatedData} headers={tableHeaders} size={isTablet ? 'lg' : 'sm'} useZebraStyles>
        {({ rows, headers, getTableProps, getHeaderProps }) => (
          <TableContainer className={styles.tableContainer}>
            <Table className={styles.table} aria-label="dyaku-patients-table" {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })} key={header.key}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.info.header === 'actions' ? (
                          <DyakuPatientSyncButton
                            patient={cell.value}
                            onSyncComplete={handleIndividualSyncComplete}
                            size="sm"
                          />
                        ) : (
                          cell.value
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>

      <PatientChartPagination
        pageNumber={currentPage}
        totalItems={tableRows.length}
        currentItems={paginatedData.length}
        pageSize={pageSize}
        onPageNumberChange={({ page }) => goTo(page)}
      />
    </div>
  );
};

export default DyakuPatientsTable;
