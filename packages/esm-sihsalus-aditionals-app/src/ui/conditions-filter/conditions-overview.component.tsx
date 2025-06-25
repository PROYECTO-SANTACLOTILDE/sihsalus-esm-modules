import {
  Button,
  DataTable,
  DataTableSkeleton,
  Dropdown,
  InlineLoading,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tile,
} from '@carbon/react';
import {
  AddIcon,
  formatDate,
  isDesktop as isDesktopLayout,
  parseDate,
  useConfig,
  useLayoutType,
  usePagination,
  launchWorkspace,
} from '@openmrs/esm-framework';
import { CardHeader, EmptyState, ErrorState, PatientChartPagination } from '@openmrs/esm-patient-common-lib';
import classNames from 'classnames';
import React, { type ComponentProps, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ConfigObject } from '../../config-schema';
import { ConditionsActionMenu } from './conditions-action-menu.component';
import styles from './conditions-overview.scss';
import { type Condition, useConditionsFromConceptSet, useConditionsSorting } from './conditions.resource';

interface ConditionTableRow extends Condition {
  id: string;
  condition: string;
  abatementDateTime: string;
  onsetDateTimeRender: string;
}

interface ConditionTableHeader {
  key: 'display' | 'onsetDateTimeRender' | 'status';
  header: string;
  isSortable: true;
  sortFunc: (valueA: ConditionTableRow, valueB: ConditionTableRow) => number;
}

interface ConditionsOverviewProps {
  patientUuid: string;
}

const ConditionsOverview: React.FC<ConditionsOverviewProps> = ({ patientUuid }) => {
  const { conditionPageSize } = useConfig<ConfigObject>();
  const { t } = useTranslation();
  const displayText = t('antecedentesPatologicos', 'Antecedentes Patológicos del Menor');
  const headerTitle = t('antecedentesPatologicos', 'Antecedentes Patológicos del Menor');
  const urlLabel = t('seeAll', 'See all');
  const pageUrl = `\${openmrsSpaBase}/patient/${patientUuid}/chart/Conditions`;
  const layout = useLayoutType();
  const isDesktop = isDesktopLayout(layout);
  const isTablet = !isDesktop;

  const conceptSetUuid = 'c33ef45d-aa69-4d9a-9214-1dbb52609601'; // UUID del ConceptSet de Antecedentes Patológicos
  //TODO USE CONFIG TO GET CONCEPT SET UUID
  const { conditions, error, isLoading, isValidating } = useConditionsFromConceptSet(patientUuid, conceptSetUuid);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('Active');

  // Opciones de filtro traducidas
  const filterOptions = useMemo(
    () => [
      { key: 'All', label: t('all', 'Todos') },
      { key: 'Active', label: t('active', 'Activo') },
      { key: 'Inactive', label: t('inactive', 'Inactivo') },
    ],
    [t],
  );
  //TODO UPDATE THIS TO ASK FOR A VISIT FIRST
  const launchConditionsForm = useCallback(
    () =>
      launchWorkspace('conditions-filter-form-workspace', {
        formContext: 'creating',
      }),
    [],
  );

  const filteredConditions = useMemo(() => {
    if (!filter || filter == 'All') {
      return conditions;
    }

    if (filter) {
      return conditions?.filter((condition) => condition.clinicalStatus === filter);
    }

    return conditions;
  }, [filter, conditions]);

  const headers: Array<ConditionTableHeader> = useMemo(
    () => [
      {
        key: 'display',
        header: t('condition', 'Condition'),
        isSortable: true,
        sortFunc: (valueA, valueB) => valueA.display?.localeCompare(valueB.display),
      },
      {
        key: 'onsetDateTimeRender',
        header: t('dateOfOnset', 'Date of onset'),
        isSortable: true,
        sortFunc: (valueA, valueB) =>
          valueA.onsetDateTime && valueB.onsetDateTime
            ? new Date(valueA.onsetDateTime).getTime() - new Date(valueB.onsetDateTime).getTime()
            : 0,
      },
      {
        key: 'status',
        header: t('status', 'Status'),
        isSortable: true,
        sortFunc: (valueA, valueB) => valueA.clinicalStatus?.localeCompare(valueB.clinicalStatus),
      },
    ],
    [t],
  );

  const tableRows = useMemo(() => {
    return filteredConditions?.map((condition) => {
      return {
        ...condition,
        id: condition.id,
        condition: condition.display,
        abatementDateTime: condition.abatementDateTime,
        onsetDateTimeRender: condition.onsetDateTime
          ? formatDate(parseDate(condition.onsetDateTime), { mode: 'wide', time: 'for today' })
          : '--',
        status:
          condition.clinicalStatus === 'Active'
            ? t('active', 'Activo')
            : condition.clinicalStatus === 'Inactive'
              ? t('inactive', 'Inactivo')
              : condition.clinicalStatus,
      };
    });
  }, [filteredConditions, t]);

  const { sortedRows, sortRow } = useConditionsSorting(headers, tableRows);

  const { results: paginatedConditions, goTo, currentPage } = usePagination(sortedRows, conditionPageSize);

  const handleConditionStatusChange = ({ selectedItem }) => setFilter(selectedItem?.key || 'All');

  if (isLoading) return <DataTableSkeleton role="progressbar" compact={isDesktop} zebra />;
  if (error) return <ErrorState error={error} headerTitle={headerTitle} />;
  if (conditions?.length) {
    return (
      <div className={styles.widgetCard}>
        <CardHeader title={headerTitle}>
          <span>{isValidating ? <InlineLoading /> : null}</span>
          <div className={styles.rightMostFlexContainer}>
            <div className={styles.filterContainer}>
              <Dropdown
                id="conditionStatusFilter"
                initialSelectedItem={filterOptions.find((option) => option.key === 'Active')}
                label=""
                titleText={t('show', 'Show') + ':'}
                type="inline"
                items={filterOptions}
                itemToString={(item) => item?.label || ''}
                onChange={handleConditionStatusChange}
                size={isTablet ? 'lg' : 'sm'}
              />
            </div>
            <div className={styles.divider}>|</div>
            <Button
              kind="ghost"
              renderIcon={(props: ComponentProps<typeof AddIcon>) => <AddIcon size={16} {...props} />}
              iconDescription="Add conditions"
              onClick={launchConditionsForm}>
              {t('add', 'Add')}
            </Button>
          </div>
        </CardHeader>
        <DataTable
          aria-label="conditions overview"
          rows={paginatedConditions}
          headers={headers}
          isSortable
          size={isTablet ? 'lg' : 'sm'}
          useZebraStyles
          overflowMenuOnHover={isDesktop}
          sortRow={sortRow}>
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <>
              <TableContainer className={styles.tableContainer}>
                <Table {...getTableProps()} className={styles.table}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader
                          className={classNames(styles.productiveHeading01, styles.text02)}
                          {...getHeaderProps({
                            header,
                            isSortable: header.isSortable,
                          })}>
                          {header.header?.content ?? header.header}
                        </TableHeader>
                      ))}
                      <TableHeader aria-label={t('actions', 'Actions')} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value?.content ?? cell.value}</TableCell>
                        ))}
                        <TableCell className="cds--table-column-menu">
                          <ConditionsActionMenu condition={row} patientUuid={patientUuid} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {rows.length === 0 ? (
                <div className={styles.tileContainer}>
                  <Tile className={styles.tile}>
                    <div className={styles.tileContent}>
                      <p className={styles.content}>{t('noConditionsToDisplay', 'No conditions to display')}</p>
                      <p className={styles.helper}>{t('checkFilters', 'Check the filters above')}</p>
                    </div>
                  </Tile>
                </div>
              ) : null}
            </>
          )}
        </DataTable>
        <PatientChartPagination
          currentItems={paginatedConditions.length}
          onPageNumberChange={({ page }) => goTo(page)}
          pageNumber={currentPage}
          pageSize={conditionPageSize}
          totalItems={filteredConditions.length}
          dashboardLinkUrl={pageUrl}
          dashboardLinkLabel={urlLabel}
        />
      </div>
    );
  }
  return <EmptyState displayText={displayText} headerTitle={headerTitle} launchForm={launchConditionsForm} />;
};

export default ConditionsOverview;
