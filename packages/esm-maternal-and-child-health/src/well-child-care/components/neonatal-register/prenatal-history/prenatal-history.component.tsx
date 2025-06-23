import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  DataTable,
  DataTableSkeleton,
  InlineLoading,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import {
  CardHeader,
  EmptyState,
  ErrorState,
  useVisitOrOfflineVisit,
  launchStartVisitPrompt,
} from '@openmrs/esm-patient-common-lib';
import { AddIcon, launchWorkspace, useConfig, useLayoutType } from '@openmrs/esm-framework';
import { usePrenatalAntecedents, usePrenatalConceptMetadata } from '../../../../hooks/usePrenatalAntecedents';
import styles from './prenatal-history.scss';
import type { ConfigObject } from '../../../../config-schema';

interface NeonatalSummaryProps {
  patientUuid: string;
}

const PrenatalAntecedents: React.FC<NeonatalSummaryProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const displayText = t('biometrics_lower', 'biometrics');
  const headerTitle = t('prenatalAntecedents', 'Antecedentes Prenatales');
  const isTablet = useLayoutType() === 'tablet';

  const config = useConfig<ConfigObject>();
  const { data: formattedObs, isLoading, error, mutate } = usePrenatalAntecedents(patientUuid);
  const { data: conceptUnits } = usePrenatalConceptMetadata();
  const { currentVisit } = useVisitOrOfflineVisit(patientUuid);

  const launchPerinatalForm = useCallback(() => {
    if (!currentVisit) {
      launchStartVisitPrompt();
      return;
    }

    launchWorkspace('perinatal-register-form', { patientUuid });
  }, [currentVisit, patientUuid]);

  const tableRows = useMemo(() => {
    if (!formattedObs?.length) return [];

    const lastAntecedent = formattedObs[0];

    return [
      {
        id: 'gravidez',
        label: t('gravidez', 'Gravidez'),
        value: lastAntecedent.gravidez || '--',
      },
      {
        id: 'partoAlTermino',
        label: t('partoAlTermino', 'Partos a término'),
        value: lastAntecedent.partoAlTermino || '--',
      },
      {
        id: 'partoPrematuro',
        label: t('partoPrematuro', 'Partos prematuros'),
        value: lastAntecedent.partoPrematuro || '--',
      },
      {
        id: 'partoAborto',
        label: t('partoAborto', 'Abortos'),
        value: lastAntecedent.partoAborto || '--',
      },
      {
        id: 'partoNacidoVivo',
        label: t('partoNacidoVivo', 'Nacidos vivos'),
        value: lastAntecedent.partoNacidoVivo || '--',
      },
    ];
  }, [formattedObs, t]);

  if (isLoading) return <DataTableSkeleton role="progressbar" />;
  if (error) return <ErrorState error={error} headerTitle={headerTitle} />;
  if (formattedObs?.length) {
    return (
      <div className={styles.widgetCard}>
        <CardHeader title={headerTitle}>
          {isLoading && <InlineLoading description={t('loading', 'Loading...')} />}
          <Button kind="ghost" renderIcon={(props) => <AddIcon size={16} {...props} />} onClick={launchPerinatalForm}>
            {t('update', 'Actualizar')}
          </Button>
        </CardHeader>
        <DataTable
          rows={tableRows}
          headers={[
            { key: 'label', header: t('field', 'Campo') },
            { key: 'value', header: t('value', 'Valor') },
          ]}
          size="sm"
          useZebraStyles
        >
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <TableContainer>
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
        </DataTable>
      </div>
    );
  }
  return <EmptyState displayText={displayText} headerTitle={headerTitle} launchForm={launchPerinatalForm} />;
};

export default PrenatalAntecedents;
