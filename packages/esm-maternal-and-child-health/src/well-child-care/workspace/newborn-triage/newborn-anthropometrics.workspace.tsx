import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  ButtonSkeleton,
  ButtonSet,
  Column,
  Form,
  InlineNotification,
  NumberInputSkeleton,
  Row,
  Stack,
} from '@carbon/react';
import { createErrorHandler, showSnackbar, useConfig, useLayoutType, useSession } from '@openmrs/esm-framework';
import type { DefaultPatientWorkspaceProps } from '@openmrs/esm-patient-common-lib';
import type { ConfigObject } from '../../../config-schema';
import { isValueWithinReferenceRange } from './vitals-biometrics-form.utils';
import {
  assessValue,
  getReferenceRangesForConcept,
  invalidateCachedVitalsAndBiometrics,
  saveVitalsAndBiometrics,
  useVitalsConceptMetadata,
} from '../../common';
import NewbornVitalsInput from './newborn-vitals-input.component';
import styles from './newborn-vitals-form.scss';

const AnthropometricsSchema = z
  .object({
    weight: z.number(),
    height: z.number(),
    headCircumference: z.number(),
    chestCircumference: z.number(),
  })
  .partial()
  .refine((fields) => Object.values(fields).some((value) => Boolean(value)), {
    message: 'Please fill at least one field',
    path: ['oneFieldRequired'],
  });

export type AnthropometricsFormType = z.infer<typeof AnthropometricsSchema>;

const NewbornAnthropometricsForm: React.FC<DefaultPatientWorkspaceProps> = ({
  patientUuid,
  closeWorkspace,
  closeWorkspaceWithSavedChanges,
  promptBeforeClosing,
}) => {
  const { t } = useTranslation();
  const isTablet = useLayoutType() === 'tablet';
  const config = useConfig<ConfigObject>();
  const session = useSession();
  const { data: conceptUnits, conceptMetadata, conceptRanges, isLoading } = useVitalsConceptMetadata();
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm<AnthropometricsFormType>({
    mode: 'all',
    resolver: zodResolver(AnthropometricsSchema),
  });

  useEffect(() => {
    promptBeforeClosing(() => isDirty);
  }, [isDirty, promptBeforeClosing]);

  const weight = watch('weight');

  const concepts = useMemo(
    () => ({
      weightRange: conceptRanges.get(config.concepts.weightUuid),
      heightRange: conceptRanges.get(config.concepts.heightUuid),
      headCircumferenceRange: conceptRanges.get(config.concepts.headCircumferenceUuid),
      chestCircumferenceRange: conceptRanges.get(config.concepts.chestCircumferenceUuid),
    }),
    [
      conceptRanges,
      config.concepts.weightUuid,
      config.concepts.heightUuid,
      config.concepts.headCircumferenceUuid,
      config.concepts.chestCircumferenceUuid,
    ],
  );

  const saveAnthropometrics = useCallback(
    (data: AnthropometricsFormType) => {
      setShowErrorMessage(true);
      setShowErrorNotification(false);

      const allFieldsAreValid = Object.entries(data)
        .filter(([, value]) => Boolean(value))
        .every(([key, value]) => isValueWithinReferenceRange(conceptMetadata, config.concepts[`${key}Uuid`], value));

      if (allFieldsAreValid) {
        setShowErrorMessage(false);
        const abortController = new AbortController();

        saveVitalsAndBiometrics(
          config.vitals.encounterTypeUuid,
          config.vitals.formUuid,
          config.concepts,
          patientUuid,
          data,
          abortController,
          session?.sessionLocation?.uuid,
        )
          .then((response) => {
            if (response.status === 201) {
              invalidateCachedVitalsAndBiometrics();
              closeWorkspaceWithSavedChanges();
              showSnackbar({
                isLowContrast: true,
                kind: 'success',
                title: t('anthropometricsRecorded', 'Datos Antropométricos registrados'),
                subtitle: t('anthropometricsNowAvailable', 'Ahora visibles en la página de Datos Antropométricos'),
              });
            }
          })
          .catch(() => {
            createErrorHandler();
            showSnackbar({
              title: t('anthropometricsSaveError', 'Error guardando los datos antropométricos'),
              kind: 'error',
              isLowContrast: false,
              subtitle: t('checkForValidity', 'Algunos valores ingresados son inválidos'),
            });
          })
          .finally(() => abortController.abort());
      } else {
        setShowErrorMessage(true);
      }
    },
    [
      closeWorkspaceWithSavedChanges,
      conceptMetadata,
      config.concepts,
      config.vitals.encounterTypeUuid,
      config.vitals.formUuid,
      patientUuid,
      session?.sessionLocation?.uuid,
      t,
    ],
  );

  function onError(err) {
    if (err?.oneFieldRequired) {
      setShowErrorNotification(true);
    }
  }

  if (isLoading) {
    return (
      <Form className={styles.form}>
        <div className={styles.grid}>
          <Stack>
            <Column>
              <p className={styles.title}>{t('recordAnthropometrics', 'Registrar Datos Antropométricos')}</p>
            </Column>
            <Row className={styles.row}>
              <Column>
                <NumberInputSkeleton />
              </Column>
              <Column>
                <NumberInputSkeleton />
              </Column>
              <Column>
                <NumberInputSkeleton />
              </Column>
              <Column>
                <NumberInputSkeleton />
              </Column>
            </Row>
          </Stack>
        </div>
        <ButtonSet className={isTablet ? styles.tablet : styles.desktop}>
          <ButtonSkeleton className={styles.button} />
          <ButtonSkeleton className={styles.button} type="submit" />
        </ButtonSet>
      </Form>
    );
  }

  return (
    <Form className={styles.form}>
      <div className={styles.grid}>
        <Stack gap={4}>
          <Column>
            <p className={styles.title}>{t('anthropometrics', 'Datos Antropométricos del Recién Nacido')}</p>
          </Column>
          <Row className={styles.row}>
            <NewbornVitalsInput
              control={control}
              fieldProperties={[
                {
                  name: t('weight', 'Weight'),
                  type: 'number',
                  min: concepts.weightRange?.lowAbsolute,
                  max: concepts.weightRange?.highAbsolute,
                  id: 'weight',
                },
              ]}
              interpretation={
                weight && assessValue(weight, getReferenceRangesForConcept(config.concepts.weightUuid, conceptMetadata))
              }
              showErrorMessage={showErrorMessage}
              label={t('weight', 'Weight')}
              unitSymbol={conceptUnits.get(config.concepts.weightUuid) ?? 'kg'} // Usar conceptUnits con fallback
            />
            <NewbornVitalsInput
              control={control}
              fieldProperties={[
                {
                  id: 'height',
                  name: t('height', 'Height'),
                  type: 'number',
                  min: concepts.heightRange?.lowAbsolute,
                  max: concepts.heightRange?.highAbsolute,
                },
              ]}
              label={t('height', 'Height')}
              unitSymbol={conceptUnits.get(config.concepts.heightUuid) ?? 'cm'} // Usar conceptUnits con fallback
            />
            <NewbornVitalsInput
              control={control}
              fieldProperties={[
                {
                  id: 'headCircumference',
                  name: t('headCircumference', 'Head Circumference'),
                  type: 'number',
                  min: 25,
                  max: 50,
                },
              ]}
              label={t('headCircumference', 'Head Circumference')}
              unitSymbol={conceptUnits.get(config.concepts.headCircumferenceUuid) ?? 'cm'} // Usar conceptUnits con fallback
            />
            <NewbornVitalsInput
              control={control}
              fieldProperties={[
                {
                  id: 'chestCircumference',
                  name: t('chestCircumference', 'Chest Circumference'),
                  type: 'number',
                  min: 20,
                  max: 45,
                },
              ]}
              label={t('chestCircumference', 'Chest Circumference')}
              unitSymbol={conceptUnits.get(config.concepts.chestCircumferenceUuid) ?? 'cm'} // Usar conceptUnits con fallback
            />
          </Row>
        </Stack>
      </div>
      {showErrorNotification && (
        <Column className={styles.errorContainer}>
          <InlineNotification
            className={styles.errorNotification}
            lowContrast={false}
            onClose={() => setShowErrorNotification(false)}
            title={t('error', 'Error')}
            subtitle={t('pleaseFillField', 'Por favor, complete al menos un campo') + '.'}
          />
        </Column>
      )}
      <ButtonSet className={isTablet ? styles.tablet : styles.desktop}>
        <Button className={styles.button} kind="secondary" onClick={closeWorkspace}>
          {t('discard', 'Descartar')}
        </Button>
        <Button
          className={styles.button}
          kind="primary"
          onClick={handleSubmit(saveAnthropometrics, onError)}
          disabled={isSubmitting}
          type="submit"
        >
          {t('submit', 'Guardar y Cerrar')}
        </Button>
      </ButtonSet>
    </Form>
  );
};

export default NewbornAnthropometricsForm;
