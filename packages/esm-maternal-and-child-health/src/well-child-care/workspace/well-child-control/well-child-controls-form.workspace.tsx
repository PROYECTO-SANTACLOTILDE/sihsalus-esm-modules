import { Button, ButtonSet, Column, Form, InlineNotification, TextInput, Tooltip } from '@carbon/react';
import { Information as InformationIcon } from '@carbon/react/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { age, ResponsiveWrapper, useConfig, useLayoutType, usePatient, launchWorkspace } from '@openmrs/esm-framework';
import { type DefaultPatientWorkspaceProps, useVisitOrOfflineVisit } from '@openmrs/esm-patient-common-lib';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import type { ConfigObject } from '../../../config-schema';
import { useAgeGroups } from '../../../hooks/useAgeGroups';
import { useCREDFormsForAgeGroup } from '../../../hooks/useCREDFormsForAgeGroup';
import useCREDEncounters from '../../../hooks/useEncountersCRED';
import EncounterDateTimeSection from '../../../ui/encounter-date-time/encounter-date-time.component';
import styles from './well-child-controls-form.scss';

const CREDControlsSchema = z.object({
  consultationDate: z.date({ required_error: 'Fecha de atención es requerida' }),
  consultationTime: z.string().min(1, 'Hora de atención es requerida'),
  controlNumber: z.string().optional(),
  attendedAge: z.string().optional(),
});

type CREDControlsFormType = z.infer<typeof CREDControlsSchema>;

const CREDControlsWorkspace: React.FC<DefaultPatientWorkspaceProps> = ({
  patientUuid,
  closeWorkspace,
  closeWorkspaceWithSavedChanges,
  promptBeforeClosing,
}) => {
  const { t } = useTranslation();
  const isTablet = useLayoutType() === 'tablet';
  const config = useConfig<ConfigObject>();
  const { patient, isLoading: isPatientLoading } = usePatient(patientUuid);
  const { currentVisit } = useVisitOrOfflineVisit(patientUuid);
  const { encounters, isLoading: isEncountersLoading } = useCREDEncounters(patientUuid);
  const { getAgeGroupForForms } = useAgeGroups();

  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
    register,
    setValue,
  } = useForm<CREDControlsFormType>({
    mode: 'all',
    resolver: zodResolver(CREDControlsSchema),
    defaultValues: {
      consultationDate: new Date(),
      consultationTime: new Date().toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    },
  });

  useEffect(() => {
    promptBeforeClosing(() => isDirty);
  }, [isDirty, promptBeforeClosing]);

  const credControlNumber = useMemo(() => (encounters ? encounters.length + 1 : 1), [encounters]);

  const ageGroup = useMemo(() => {
    if (!patient?.birthDate) return null;
    try {
      return getAgeGroupForForms(patient.birthDate);
    } catch (error) {
      console.warn('Error getting age group:', error);
      return null;
    }
  }, [patient?.birthDate, getAgeGroupForForms]);

  const formattedAge = useMemo(() => (patient?.birthDate ? age(patient.birthDate) : ''), [patient?.birthDate]);

  const allAvailableForms = useCREDFormsForAgeGroup(config, patient?.birthDate);

  const handleStartControl = useCallback(() => {
    const consultationData = watch();
    if (!consultationData.consultationDate || !consultationData.consultationTime || !currentVisit) {
      setShowErrorNotification(true);
      return;
    }

    sessionStorage.setItem(
      'credConsultationData',
      JSON.stringify({
        ...consultationData,
        patientUuid,
        visitUuid: currentVisit.uuid,
        controlNumber: credControlNumber,
        patientAge: formattedAge,
      }),
    );

    closeWorkspace({
      onWorkspaceClose: () =>
        launchWorkspace('forms-selector-workspace', {
          availableForms: allAvailableForms,
          patientAge: formattedAge,
          controlNumber: credControlNumber,
          title: t('credFormsSelection', 'Selección de Formularios CRED'),
          subtitle: t(
            'credFormsInstructions',
            'Seleccione los formularios que desea completar para este control CRED.',
          ),
          backWorkspace: 'wellchild-control-form',
        }),
      closeWorkspaceGroup: false,
    });
  }, [watch, patientUuid, currentVisit, closeWorkspace, allAvailableForms, formattedAge, credControlNumber, t]);

  useEffect(() => {
    const now = new Date();
    setValue('consultationDate', now);
    setValue(
      'consultationTime',
      now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false }),
    );
    setValue('controlNumber', credControlNumber.toString());
    setValue('attendedAge', ageGroup ? ageGroup.label : formattedAge);
  }, [setValue, credControlNumber, ageGroup, formattedAge]);

  if (isPatientLoading || isEncountersLoading) {
    return (
      <ResponsiveWrapper>
        <div className={styles.loadingContainer}>{t('loading', 'Cargando...')}</div>
      </ResponsiveWrapper>
    );
  }

  return (
    <Form className={styles.form}>
      <div className={styles.grid}>
        <EncounterDateTimeSection
          control={control}
          firstEncounterDateTime={
            encounters[0]?.encounterDatetime ? new Date(encounters[0].encounterDatetime).getTime() : undefined
          }
          lastEncounterDateTime={
            encounters[encounters.length - 1]?.encounterDatetime
              ? new Date(encounters[encounters.length - 1].encounterDatetime).getTime()
              : undefined
          }
        />

        <div>
          <div className={styles.sectionTitle}>{t('detailsOfLastControl', 'Detalles del Último Control')}</div>
          <Column lg={4} md={2} sm={2}>
            <TextInput
              id="lastControlDate"
              labelText={t('lastControlDate', 'Fecha de Último control')}
              value={
                encounters.length > 0
                  ? new Date(encounters[encounters.length - 1].encounterDatetime).toLocaleDateString('es-PE')
                  : t('neverPerformed', 'Nunca se ha hecho')
              }
              readOnly
              disabled
              helperText={t('lastControlHelper', '* Fecha del último control realizado')}
            />
          </Column>
          <Column lg={4} md={2} sm={2}>
            <TextInput
              id="controlNumber"
              labelText={t('controlNumber', 'Número de control')}
              value={credControlNumber.toString()}
              readOnly
              disabled
              helperText={t('controlNumberHelper', '* Calculado automáticamente')}
              {...register('controlNumber')}
            />
          </Column>
        </div>

        <div className={styles.controlInfoRow}>
          <Column lg={4} md={2} sm={2}>
            <TextInput
              id="ageGroup"
              labelText={t('patientAgeGroup', 'Grupo Etario del Paciente')}
              value={ageGroup ? ageGroup.label : t('unknownAgeGroup', 'No determinado')}
              readOnly
              disabled
              helperText={t('ageGroupHelper', '* Grupo etario basado en la edad del paciente')}
            />
          </Column>
          <Tooltip
            align="top"
            label={
              <div className={styles.ageGroupTooltipInfo}>
                <p className={styles.tooltipTitle}>{t('ageGroupsInfo', 'Información de Grupos Etarios CRED:')}</p>
                <ul className={styles.ageGroupsList}>
                  <li>{t('recienNacido', 'Recién Nacido: 0-28 días')}</li>
                  <li>{t('lactanteMenor', 'Lactante Menor: 29 días - 11 meses')}</li>
                  <li>{t('lactanteMayor', 'Lactante Mayor: 12-23 meses')}</li>
                  <li>{t('preescolar', 'Preescolar: 2-4 años')}</li>
                  <li>{t('escolar', 'Escolar: 5-11 años')}</li>
                </ul>
              </div>
            }>
            <button className={styles.tooltipButton} type="button">
              <InformationIcon className={styles.icon} size={20} />
            </button>
          </Tooltip>
        </div>

        {showErrorNotification && (
          <InlineNotification
            className={styles.errorNotification}
            lowContrast={false}
            onClose={() => setShowErrorNotification(false)}
            title={t('error', 'Error')}
            subtitle={t(
              'completeRequiredFields',
              'Por favor complete los campos requeridos (Fecha y Hora de atención).',
            )}
          />
        )}
      </div>

      <ButtonSet className={isTablet ? styles.tablet : styles.desktop}>
        <Button className={styles.button} kind="secondary" onClick={closeWorkspace}>
          {t('discard', 'Cancelar')}
        </Button>
        <Button
          className={styles.button}
          kind="primary"
          onClick={handleStartControl}
          disabled={!currentVisit || isSubmitting}
          type="button">
          {t('startControl', 'Empezar Control')}
        </Button>
      </ButtonSet>
    </Form>
  );
};

export default CREDControlsWorkspace;
