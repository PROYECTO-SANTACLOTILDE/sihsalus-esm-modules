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
import styles from './stimulation-sessions.scss';

interface StimulationSessionsProps {
  patientUuid: string;
}

const StimulationSessions: React.FC<StimulationSessionsProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('esSessionsTitle', 'Sesiones de Estimulación');

  // TODO: Connect to SWR hook when concept UUIDs are configured
  const totalSessions = null;
  const lastSessionDate = null;
  const developmentAreas = null;
  const nextSessionDate = null;

  return (
    <div className={styles.widgetCard}>
      <CardHeader title={headerTitle}>
        <Tag type={totalSessions ? 'blue' : 'gray'} size="sm">
          {totalSessions ? `${totalSessions} ${t('sessions', 'sesiones')}` : t('noData', 'Sin datos')}
        </Tag>
      </CardHeader>
      <div className={styles.container}>
        <StructuredListWrapper isCondensed>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('esSessionsCompleted', 'Sesiones realizadas')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {totalSessions ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('esDevelopmentAreas', 'Áreas de desarrollo')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {developmentAreas ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('lastSession', 'Última sesión')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {lastSessionDate ?? <span className={styles.noData}>{t('noData', 'Sin datos')}</span>}
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell className={styles.label}>
                {t('fpNextSession', 'Próxima sesión')}
              </StructuredListCell>
              <StructuredListCell className={styles.value}>
                {nextSessionDate ?? <span className={styles.noData}>{t('pending', 'Pendiente')}</span>}
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    </div>
  );
};

export default StimulationSessions;
