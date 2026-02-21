import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tag,
  Button,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { CardHeader } from '@openmrs/esm-patient-common-lib';
import { launchWorkspace2, useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../../../../config-schema';
import styles from './stimulation-followup.scss';

interface StimulationFollowupProps {
  patientUuid: string;
}

const StimulationFollowup: React.FC<StimulationFollowupProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig<ConfigObject>();
  const headerTitle = t('esFollowUpTitle', 'Seguimiento del Desarrollo');

  const handleAdd = useCallback(() => {
    const formUuid = config.formsList.stimulationFollowupForm;
    if (!formUuid) {
      console.warn('Form UUID not configured for stimulationFollowupForm');
      return;
    }
    launchWorkspace2('patient-form-entry-workspace', {
      form: { uuid: formUuid },
      encounterUuid: '',
    });
  }, [config.formsList.stimulationFollowupForm]);

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const milestonesAchieved = null;
  const lastEvaluationResult = null;
  const lastEvaluationDate = null;
  const nextEvaluationDate = null;
  const riskLevel = null;

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <Tag type={riskLevel === 'normal' ? 'green' : riskLevel ? 'red' : 'gray'} size="sm">
          {riskLevel ?? t('noData', 'Sin datos')}
        </Tag>
        <Button kind="ghost" size="sm" renderIcon={Add} onClick={handleAdd} iconDescription={t('add', 'Agregar')}>
          {t('add', 'Agregar')}
        </Button>
      </CardHeader>
      <div className={styles.container}>
        <StructuredListWrapper isCondensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('esMilestones', 'Hitos alcanzados')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {milestonesAchieved ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('esLastEvaluation', 'Última evaluación')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastEvaluationResult ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('lastDate', 'Fecha')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastEvaluationDate ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('esNextEvaluation', 'Próxima evaluación')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {nextEvaluationDate ?? <span className={styles.noData}>{t('pending', 'Pendiente')}</span>}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
};

export default StimulationFollowup;
