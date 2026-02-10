import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Tab, TabList, TabPanel, TabPanels, Tabs, Tile } from '@carbon/react';
import {
  Chat,
  Catalog,
  DocumentMultiple_01,
  Finance,
} from '@carbon/react/icons';
import styles from './consulta-externa-dashboard.scss';
import MotivoConsulta from './motivo-consulta.component';
import DiagnosticoClasificado from './diagnostico-clasificado.component';
import NotasSoap from './notas-soap.component';
import Financiador from './financiador.component';

interface ConsultaExternaDashboardProps {
  patientUuid: string;
}

const ConsultaExternaDashboard: React.FC<ConsultaExternaDashboardProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Layer>
        <Tile>
          <div className={styles.desktopHeading}>
            <h4>{t('consultaExterna', 'Consulta Externa')}</h4>
          </div>
        </Tile>
      </Layer>

      <Layer className={styles.tabsContainer}>
        <Tabs>
          <TabList contained activation="manual" aria-label={t('consultaExternaTabs', 'Consulta Externa tabs')}>
            <Tab renderIcon={Chat}>{t('chiefComplaint', 'Motivo de Consulta')}</Tab>
            <Tab renderIcon={Catalog}>{t('diagnosisClassification', 'Diagnóstico')}</Tab>
            <Tab renderIcon={DocumentMultiple_01}>{t('soapNotes', 'Notas SOAP')}</Tab>
            <Tab renderIcon={Finance}>{t('insuranceProvider', 'Financiador')}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MotivoConsulta patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <DiagnosticoClasificado patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <NotasSoap patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <Financiador patientUuid={patientUuid} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layer>
    </div>
  );
};

export default ConsultaExternaDashboard;
