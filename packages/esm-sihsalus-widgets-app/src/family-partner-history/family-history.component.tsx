import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DataTable,
  DataTableSkeleton,
  Layer,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tile,
  Button,
} from '@carbon/react';
import { Add, Edit, TrashCan } from '@carbon/react/icons';
import { EmptyDataIllustration, ErrorState, CardHeader, usePaginationInfo } from '@openmrs/esm-patient-common-lib';
import {
  ConfigurableLink,
  isDesktop,
  launchWorkspace,
  useConfig,
  useLayoutType,
  usePagination,
} from '@openmrs/esm-framework';
import { usePatientRelationships } from './relationships.resource';
import ConceptObservations from './concept-obs.component';
import type { ConfigObject } from '../config-schema';
import styles from './family-history.scss';
import { deleteRelationship } from '../relationships/relationship.resources';

interface FamilyHistoryProps {
  patientUuid: string;
}

const FamilyHistory: React.FC<FamilyHistoryProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig<ConfigObject>();
  const { concepts, familyRelationshipsTypeList } = config;
  const layout = useLayoutType();
  const [pageSize, setPageSize] = useState(10);
  const { relationships, error, isLoading, isValidating } = usePatientRelationships(patientUuid);

  const familyRelationshipTypeUUIDs = new Set(familyRelationshipsTypeList.map((type) => type.uuid));
  const familyRelationships = relationships.filter((r) => familyRelationshipTypeUUIDs.has(r.relationshipTypeUUID));

  const headerTitle = t('familyContacts', 'Family contacts');
  const { results, totalPages, currentPage, goTo } = usePagination(familyRelationships, pageSize);
  const { pageSizes } = usePaginationInfo(pageSize, totalPages, currentPage, results.length);

  const headers = [
    {
      header: t('name', 'Name'),
      key: 'name',
    },
    {
      header: t('relationToPatient', 'Relation with Patient'),
      key: 'relation',
    },
    {
      header: t('age', 'Age'),
      key: 'age',
    },
    {
      header: t('alive', 'Alive'),
      key: 'alive',
    },
    {
      header: t('causeOfDeath', 'Cause of Death'),
      key: 'causeOfDeath',
    },
    {
      header: t('chronicDisease', 'Chronic Disease'),
      key: 'chronicDisease',
    },
    { header: t('actions', 'Actions'), key: 'actions' },
  ];

  const handleAddHistory = () => {
    launchWorkspace('family-relationship-form', {
      workspaceTitle: t('familyRelationshipFormTitle', 'Family Relationship Form'),
      patientUuid,
    });
  };

  const handleEditRelationship = (relationShipUuid: string) => {
    launchWorkspace('relationship-update-form', {
      relationShipUuid,
    });
  };

  const tableRows =
    results?.map((relation) => {
      const patientUuid = relation.patientUuid;

      return {
        id: `${relation.uuid}`,
        name: (
          <ConfigurableLink
            style={{ textDecoration: 'none' }}
            to={window.getOpenmrsSpaBase() + `patient/${relation.relativeUuid}/chart/Patient Summary`}>
            {relation.name}
          </ConfigurableLink>
        ),
        relation: relation?.relationshipType,
        age: relation?.relativeAge ?? '--',
        alive: relation?.dead ? t('dead', 'Dead') : t('alive', 'Alive'),
        causeOfDeath: (
          <ConceptObservations patientUuid={patientUuid} conceptUuid={concepts.probableCauseOfDeathConceptUuid} />
        ),
        patientUuid: relation,
        chronicDisease: <ConceptObservations patientUuid={patientUuid} conceptUuid={concepts.problemListConceptUuid} />,
        actions: (
          <>
            <Button
              renderIcon={Edit}
              hasIconOnly
              kind="ghost"
              iconDescription={t('edit', 'Edit')}
              onClick={() => handleEditRelationship(relation.uuid)}
            />
            <Button
              renderIcon={TrashCan}
              hasIconOnly
              kind="ghost"
              iconDescription={t('delete', 'Delete')}
              onClick={() => deleteRelationship(relation.uuid)}
            />
          </>
        ),
      };
    }) ?? [];

  if (isLoading || isValidating) {
    return (
      <DataTableSkeleton
        headers={headers}
        aria-label={t('patientFamilyTable', 'Patient family table')}
        showToolbar={false}
        showHeader={false}
        rowCount={3}
        zebra
        columnCount={3}
        className={styles.dataTableSkeleton}
      />
    );
  }

  if (error) {
    return <ErrorState headerTitle={headerTitle} error={error} />;
  }

  if (familyRelationships.length === 0) {
    return (
      <div className={styles.widgetCard}>
        <Tile className={styles.tile}>
          <div className={!isDesktop(layout) ? styles.tabletHeading : styles.desktopHeading}>
            <h4>{headerTitle}</h4>
          </div>
          <EmptyDataIllustration />
          <p className={styles.content}>
            {t('noFamilyHistoryData', 'There is no family history data to display for this patient.')}
          </p>
          <Button onClick={handleAddHistory} renderIcon={Add} kind="ghost">
            {t('addRelationship', 'Add relationship')}
          </Button>
        </Tile>
      </div>
    );
  }

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        {isLoading && <DataTableSkeleton rowCount={5} />}
        <Button onClick={handleAddHistory} renderIcon={Add} kind="ghost">
          {t('add', 'Add')}
        </Button>
      </CardHeader>
      <DataTable
        useZebraStyles
        size="sm"
        rows={tableRows ?? []}
        headers={headers}
        render={({ rows, headers, getHeaderProps, getTableProps, getTableContainerProps }) => (
          <TableContainer {...getTableContainerProps()}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      {...getHeaderProps({
                        header,
                        isSortable: header.isSortable,
                      })}>
                      {header.header?.content ?? header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
      <Pagination
        page={currentPage}
        pageSize={pageSize}
        pageSizes={pageSizes}
        totalItems={relationships.length}
        onChange={({ page, pageSize }) => {
          goTo(page);
          setPageSize(pageSize);
        }}
        itemsPerPageText={t('itemsPerPage', 'Items per page')}
        pageNumberText={t('pageNumber', 'Page number')}
        pageRangeText={(_, total) => t('paginationPageText', 'of {{count}} pages', { count: total })}
      />
    </div>
  );
};

export default FamilyHistory;
