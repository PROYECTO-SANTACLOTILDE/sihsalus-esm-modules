import { Button, InlineLoading, InlineNotification, Modal, ProgressBar } from '@carbon/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './dyaku-patients-sync.scss';
import { useDyakuSync, type SyncResult } from './dyaku-patients.resource';

interface DyakuPatientsSyncProps {
  onSyncComplete?: (result: SyncResult) => void;
}

const DyakuPatientsSync: React.FC<DyakuPatientsSyncProps> = ({ onSyncComplete }) => {
  const { t } = useTranslation();
  const { syncPatients, isEnabled, batchSize } = useDyakuSync();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [progress, setProgress] = useState(0);

  const handleStartSync = async () => {
    if (!isEnabled) {
      return;
    }

    setIsSyncing(true);
    setProgress(0);
    setSyncResult(null);

    try {
      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const result = await syncPatients();

      clearInterval(progressInterval);
      setProgress(100);
      setSyncResult(result);

      if (onSyncComplete) {
        onSyncComplete(result);
      }

      // Auto-close modal on success after 2 seconds
      if (result.success) {
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSyncing(false);
          setProgress(0);
        }, 2000);
      }
    } catch (error) {
      setProgress(100);
      setSyncResult({
        success: false,
        synchronized: 0,
        failed: 0,
        errors: [error.message],
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCloseModal = () => {
    if (!isSyncing) {
      setIsModalOpen(false);
      setSyncResult(null);
      setProgress(0);
    }
  };

  return (
    <>
      <Button kind="secondary" onClick={() => setIsModalOpen(true)} disabled={!isEnabled} size="md">
        {t('syncDyakuPatients', 'Sincronizar Pacientes')}
      </Button>

      <Modal
        open={isModalOpen}
        onRequestClose={handleCloseModal}
        modalHeading={t('syncDyakuPatientsTitle', 'Sincronización de Pacientes Dyaku')}
        primaryButtonText={isSyncing ? t('syncing', 'Sincronizando...') : t('startSync', 'Iniciar Sincronización')}
        secondaryButtonText={t('cancel', 'Cancelar')}
        onRequestSubmit={handleStartSync}
        onSecondarySubmit={handleCloseModal}
        primaryButtonDisabled={isSyncing || !isEnabled}
        secondaryButtonDisabled={isSyncing}
        size="md"
      >
        <div className={styles.syncContent}>
          {!isEnabled && (
            <InlineNotification
              kind="warning"
              title={t('syncDisabled', 'Sincronización deshabilitada')}
              subtitle={t('syncDisabledMessage', 'La sincronización está deshabilitada en la configuración.')}
              hideCloseButton
              lowContrast
            />
          )}

          {isEnabled && !isSyncing && !syncResult && (
            <div className={styles.syncDescription}>
              <p>
                {t(
                  'syncDescription',
                  'Este proceso sincronizará hasta {{batchSize}} pacientes desde el sistema FHIR Dyaku hacia OpenMRS.',
                  { batchSize },
                )}
              </p>
              <p>
                {t(
                  'syncWarning',
                  'Los pacientes existentes serán actualizados, y los nuevos serán creados automáticamente.',
                )}
              </p>
            </div>
          )}

          {isSyncing && (
            <div className={styles.syncProgress}>
              <InlineLoading description={t('syncingPatients', 'Sincronizando pacientes...')} />
              <ProgressBar value={progress} max={100} className={styles.progressBar} />
              <p className={styles.progressText}>{t('syncProgress', 'Progreso: {{progress}}%', { progress })}</p>
            </div>
          )}

          {syncResult && (
            <div className={styles.syncResults}>
              <InlineNotification
                kind={syncResult.success ? 'success' : 'error'}
                title={
                  syncResult.success
                    ? t('syncSuccess', 'Sincronización completada')
                    : t('syncError', 'Error en la sincronización')
                }
                subtitle={
                  syncResult.success
                    ? t('syncSuccessMessage', 'Se sincronizaron {{count}} pacientes exitosamente.', {
                        count: syncResult.synchronized,
                      })
                    : t('syncErrorMessage', 'Error durante la sincronización. Ver detalles abajo.')
                }
                hideCloseButton
                lowContrast
              />

              {syncResult.synchronized > 0 && (
                <div className={styles.syncStats}>
                  <p>
                    {t('synchronized', 'Sincronizados')}: {syncResult.synchronized}
                  </p>
                  {syncResult.failed > 0 && (
                    <p>
                      {t('failed', 'Fallidos')}: {syncResult.failed}
                    </p>
                  )}
                </div>
              )}

              {syncResult.errors.length > 0 && (
                <div className={styles.syncErrors}>
                  <h4>{t('syncErrors', 'Errores:')}</h4>
                  <ul>
                    {syncResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DyakuPatientsSync;
