// perinatal-register-form.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ButtonSkeleton, ButtonSet, Column, Form, InlineNotification, Stack } from '@carbon/react';
import {
  createErrorHandler,
  showSnackbar,
  useConfig,
  useLayoutType,
  useSession,
  usePatient,
  useVisit,
} from '@openmrs/esm-framework';
import type { DefaultPatientWorkspaceProps } from '@openmrs/esm-patient-common-lib';
import type { ConfigObject } from '../../../config-schema';
import {
  usePrenatalAntecedents,
  savePrenatalAntecedents,
  usePrenatalConceptMetadata,
  invalidateCachedPrenatalAntecedents,
} from '../../../hooks/usePrenatalAntecedents';
import GenericInput from '../../../ui/generic-input/generic-input.component';
import styles from './perinatal-register-form.scss';

// Definir el esquema de validación con Zod
const PerinatalRegisterSchema = z
  .object({
    gravidez: z.number().min(0, 'Debe ser al menos 0').max(20, 'No puede exceder 20').optional(),
    partoAlTermino: z.number().min(0, 'Debe ser al menos 0').max(20, 'No puede exceder 20').optional(),
    partoPrematuro: z.number().min(0, 'Debe ser al menos 0').max(20, 'No puede exceder 20').optional(),
    partoAborto: z.number().min(0, 'Debe ser al menos 0').max(20, 'No puede exceder 20').optional(),
    partoNacidoVivo: z.number().min(0, 'Debe ser al menos 0').max(20, 'No puede exceder 20').optional(),
  })
  .refine((fields) => Object.values(fields).some((value) => value !== undefined && value !== null), {
    message: 'Por favor, completa al menos un campo',
    path: ['oneFieldRequired'],
  })
  .refine(
    (fields) => {
      const { gravidez, partoAlTermino, partoPrematuro, partoAborto } = fields;
      if (gravidez !== undefined) {
        const totalEventos = (partoAlTermino || 0) + (partoPrematuro || 0) + (partoAborto || 0);
        return totalEventos <= gravidez;
      }
      return true;
    },
    {
      message: 'La suma de Partos a término, Partos prematuros y Abortos no puede exceder Gravidez',
      path: ['gravidez'],
    },
  )
  .refine(
    (fields) => {
      const { gravidez, partoAlTermino, partoPrematuro } = fields;
      if (gravidez !== undefined) {
        const totalPartos = (partoAlTermino || 0) + (partoPrematuro || 0);
        return totalPartos <= gravidez;
      }
      return true;
    },
    {
      message: 'La suma de Partos a término y Partos prematuros no puede exceder Gravidez',
      path: ['gravidez'],
    },
  )
  .refine(
    (fields) => {
      const { gravidez, partoAborto } = fields;
      if (gravidez !== undefined) {
        return (partoAborto || 0) <= gravidez;
      }
      return true;
    },
    {
      message: 'Los Abortos no pueden exceder Gravidez',
      path: ['partoAborto'],
    },
  )
  .refine(
    (fields) => {
      const { partoAlTermino, partoPrematuro, partoNacidoVivo } = fields;
      if (partoNacidoVivo !== undefined) {
        const totalPartos = (partoAlTermino || 0) + (partoPrematuro || 0);
        return partoNacidoVivo <= totalPartos;
      }
      return true;
    },
    {
      message: 'Nacidos vivos no puede exceder la suma de Partos a término y Partos prematuros',
      path: ['partoNacidoVivo'],
    },
  );

export type PerinatalRegisterFormType = z.infer<typeof PerinatalRegisterSchema>;

const PerinatalRegisterForm: React.FC<DefaultPatientWorkspaceProps> = ({
  patientUuid,
  closeWorkspace,
  closeWorkspaceWithSavedChanges,
  promptBeforeClosing,
}) => {
  const { t } = useTranslation();
  const isTablet = useLayoutType() === 'tablet';
  const config = useConfig<ConfigObject>();
  const session = useSession();
  const patient = usePatient(patientUuid);
  const { currentVisit } = useVisit(patientUuid);
  const { data: formattedObs, isLoading: isLoadingFormattedObs, error } = usePrenatalAntecedents(patientUuid);
  const { data: conceptUnits, conceptMetadata, conceptRanges, isLoading } = usePrenatalConceptMetadata();
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty, errors },
  } = useForm<PerinatalRegisterFormType>({
    mode: 'all',
    resolver: zodResolver(PerinatalRegisterSchema),
    defaultValues: {
      gravidez: undefined,
      partoAlTermino: undefined,
      partoPrematuro: undefined,
      partoAborto: undefined,
      partoNacidoVivo: undefined,
    },
  });

  // Prerellenar el formulario con los datos más recientes
  useEffect(() => {
    if (formattedObs?.length && !isLoadingFormattedObs) {
      const latestData = formattedObs[0];
      setValue('gravidez', latestData.gravidez ?? undefined);
      setValue('partoAlTermino', latestData.partoAlTermino ?? undefined);
      setValue('partoPrematuro', latestData.partoPrematuro ?? undefined);
      setValue('partoAborto', latestData.partoAborto ?? undefined);
      setValue('partoNacidoVivo', latestData.partoNacidoVivo ?? undefined);
    }
  }, [formattedObs, isLoadingFormattedObs, setValue]);

  useEffect(() => {
    promptBeforeClosing(() => isDirty);
  }, [isDirty, promptBeforeClosing]);

  const savePerinatalData = useCallback(
    (data: PerinatalRegisterFormType) => {
      setIsSubmitting(true);
      setShowErrorNotification(false);

      const abortController = new AbortController();

      const filteredData = {
        gravidez: data.gravidez,
        partoAlTermino: data.partoAlTermino,
        partoPrematuro: data.partoPrematuro,
        partoAborto: data.partoAborto,
        partoNacidoVivo: data.partoNacidoVivo,
      };

      savePrenatalAntecedents(
        config.encounterTypes.prenatalControl,
        config.formsList.maternalHistory,
        config.madreGestante,
        patientUuid,
        filteredData,
        abortController,
        session?.sessionLocation?.uuid,
      )
        .then((response) => {
          if (response.status === 201) {
            invalidateCachedPrenatalAntecedents(patientUuid);
            closeWorkspaceWithSavedChanges();
            showSnackbar({
              isLowContrast: true,
              kind: 'success',
              title: t('perinatalDataRecorded', 'Perinatal Data Recorded'),
              subtitle: t('dataNowAvailable', 'They are now visible on the Perinatal Register'),
            });
          }
        })
        .catch((error) => {
          createErrorHandler();
          showSnackbar({
            title: t('perinatalDataSaveError', 'Error saving perinatal data'),
            kind: 'error',
            isLowContrast: false,
            subtitle: t('checkForValidity', 'Some of the values entered may be invalid'),
          });
        })
        .finally(() => {
          setIsSubmitting(false);
          abortController.abort();
        });
    },
    [closeWorkspaceWithSavedChanges, config, patientUuid, session?.sessionLocation?.uuid, t],
  );

  function onError(err) {
    if (err?.oneFieldRequired) {
      setShowErrorNotification(true);
    }
  }

  if (isLoading || isLoadingFormattedObs) {
    return (
      <Form className={styles.form}>
        <div className={styles.grid}>
          <Stack>
            <Column>
              <p className={styles.title}>{t('loading', 'Loading...')}</p>
            </Column>
          </Stack>
        </div>
        <ButtonSet className={isTablet ? styles.tablet : styles.desktop}>
          <ButtonSkeleton className={styles.button} />
          <ButtonSkeleton className={styles.button} type="submit" />
        </ButtonSet>
      </Form>
    );
  }

  if (error) {
    return (
      <Form className={styles.form}>
        <div className={styles.grid}>
          <Stack>
            <Column>
              <p className={styles.title}>{t('errorLoadingData', 'Error loading data')}</p>
            </Column>
          </Stack>
        </div>
      </Form>
    );
  }

  return (
    <Form className={styles.form} onSubmit={handleSubmit(savePerinatalData, onError)}>
      <div className={styles.grid}>
        <Stack gap={4}>
          <Column>
            <p className={styles.title}>{t('perinatalRegister', 'Perinatal Maternal Carnet')}</p>
          </Column>

          <Column>
            <GenericInput
              control={control}
              fieldProperties={[
                {
                  id: 'gravidez',
                  name: t('gravidez', 'Gravidez'),
                  min: 0,
                  max: 20,
                },
              ]}
              label={t('gravidez', 'Gravidez')}
              showErrorMessage={!!errors.gravidez}
            />
          </Column>

          <Column>
            <GenericInput
              control={control}
              fieldProperties={[
                {
                  id: 'partoAlTermino',
                  name: t('partoAlTermino', 'Partos a término'),
                  min: 0,
                  max: 20,
                },
              ]}
              label={t('partoAlTermino', 'Partos a término')}
              showErrorMessage={!!errors.partoAlTermino}
            />
          </Column>

          <Column>
            <GenericInput
              control={control}
              fieldProperties={[
                {
                  id: 'partoPrematuro',
                  name: t('partoPrematuro', 'Partos prematuros'),
                  min: 0,
                  max: 20,
                },
              ]}
              label={t('partoPrematuro', 'Partos prematuros')}
              showErrorMessage={!!errors.partoPrematuro}
            />
          </Column>

          <Column>
            <GenericInput
              control={control}
              fieldProperties={[
                {
                  id: 'partoAborto',
                  name: t('partoAborto', 'Abortos'),
                  min: 0,
                  max: 20,
                },
              ]}
              label={t('partoAborto', 'Abortos')}
              showErrorMessage={!!errors.partoAborto}
            />
          </Column>

          <Column>
            <GenericInput
              control={control}
              fieldProperties={[
                {
                  id: 'partoNacidoVivo',
                  name: t('partoNacidoVivo', 'Nacidos vivos'),
                  min: 0,
                  max: 20,
                },
              ]}
              label={t('partoNacidoVivo', 'Nacidos vivos')}
              showErrorMessage={!!errors.partoNacidoVivo}
            />
          </Column>
        </Stack>
      </div>

      {showErrorNotification && (
        <Column className={styles.errorContainer}>
          <InlineNotification
            className={styles.errorNotification}
            lowContrast={false}
            onClose={() => setShowErrorNotification(false)}
            title={t('error', 'Error')}
            subtitle={t('pleaseFillField', 'Please fill at least one field') + '.'}
          />
        </Column>
      )}

      <ButtonSet className={isTablet ? styles.tablet : styles.desktop}>
        <Button className={styles.button} kind="secondary" onClick={closeWorkspace}>
          {t('discard', 'Discard')}
        </Button>
        <Button
          className={styles.button}
          kind="primary"
          onClick={handleSubmit(savePerinatalData, onError)}
          disabled={isSubmitting}
          type="submit"
        >
          {t('submit', 'Save and Close')}
        </Button>
      </ButtonSet>
    </Form>
  );
};

export default PerinatalRegisterForm;
