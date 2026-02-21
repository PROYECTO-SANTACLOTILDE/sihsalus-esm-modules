import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tag,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '@carbon/react';
import { CardHeader } from '@openmrs/esm-patient-common-lib';
import styles from './stimulation-counseling.scss';

interface StimulationCounselingProps {
  patientUuid: string;
}

const StimulationCounseling: React.FC<StimulationCounselingProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('esCounselingTitle', 'Consejería a Padres');

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const parentSessions = null;
  const lastCounselingDate = null;
  const homeActivities = null;
  const nextCounselingDate = null;

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <Tag type={parentSessions ? 'blue' : 'gray'} size="sm">
          {parentSessions ? `${parentSessions} ${t('sessions', 'sesiones')}` : t('noData', 'Sin datos')}
        </Tag>
      </CardHeader>
      <div className={styles.container}>
        <StructuredListWrapper isCondensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('esCounselingSessions', 'Sesiones de consejería')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {parentSessions ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('lastSession', 'Última sesión')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastCounselingDate ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('esHomeActivities', 'Actividades para el hogar')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {homeActivities ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('fpNextSession', 'Próxima sesión')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {nextCounselingDate ?? <span className={styles.noData}>{t('pending', 'Pendiente')}</span>}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
};

export default StimulationCounseling;
