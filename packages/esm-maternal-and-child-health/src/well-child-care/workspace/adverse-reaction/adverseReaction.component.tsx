import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Form,
  TextArea,
  Select,
  SelectItem,
  DatePicker,
  DatePickerInput,
  Layer,
  Tile,
  InlineNotification,
} from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { usePatient } from '@openmrs/esm-framework';
import styles from './adverse-reaction-form.scss';

// Tipos para las reacciones adversas
interface AdverseReaction {
  vaccineName: string;
  reactionDescription: string;
  severity: 'mild' | 'moderate' | 'severe' | '';
  occurrenceDate: string;
}

interface AdverseReactionFormProps {
  patientUuid: string;
  onSubmit?: (reaction: AdverseReaction) => void;
}

// Lista de vacunas comunes (puedes expandirla según necesites)
const VACCINE_OPTIONS = [
  'HiB RN',
  'BCG',
  'Pentavalente (DPT, HB, Hib)',
  'Polio',
  'Rotavirus',
  'Neumococo',
  'Influenza pediátrica',
  'SPR',
  'Varicela',
];

export const AdverseReactionForm: React.FC<AdverseReactionFormProps> = ({ patientUuid, onSubmit }) => {
  const { t } = useTranslation();
  const { patient } = usePatient(patientUuid);
  const [formData, setFormData] = useState<AdverseReaction>({
    vaccineName: '',
    reactionDescription: '',
    severity: '',
    occurrenceDate: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof AdverseReaction, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const validateForm = useCallback((): boolean => {
    if (!formData.vaccineName) {
      setError(t('vaccineRequired', 'Debe seleccionar una vacuna'));
      return false;
    }
    if (!formData.reactionDescription.trim()) {
      setError(t('descriptionRequired', 'Debe ingresar una descripción de la reacción'));
      return false;
    }
    if (!formData.severity) {
      setError(t('severityRequired', 'Debe seleccionar la severidad'));
      return false;
    }
    if (!formData.occurrenceDate) {
      setError(t('dateRequired', 'Debe seleccionar la fecha de ocurrencia'));
      return false;
    }
    return true;
  }, [formData, t]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (validateForm()) {
        onSubmit?.({
          ...formData,
          occurrenceDate: new Date(formData.occurrenceDate).toISOString(),
        });
        setFormData({
          vaccineName: '',
          reactionDescription: '',
          severity: '',
          occurrenceDate: '',
        });
      }
    },
    [formData, onSubmit, validateForm],
  );

  return (
    <Tile className={styles.adverseReactionForm}>
      <h3 className={styles.formTitle}>{t('adverseReactionRecord', 'Registro de Reacciones Adversas a Vacunas')}</h3>
      <p className={styles.formSubtitle}>
        {t('patient', 'Paciente')}: {patient?.name?.[0]?.given?.join(' ') || '--'} {patient?.name?.[0]?.family || ''}
      </p>

      <Layer>
        <Form onSubmit={handleSubmit}>
          {error && (
            <InlineNotification
              kind="error"
              title={t('validationError', 'Error de validación')}
              subtitle={error}
              lowContrast
              className={styles.errorNotification}
            />
          )}

          <Select
            id="vaccine-select"
            labelText={t('vaccine', 'Vacuna')}
            value={formData.vaccineName}
            onChange={(e) => handleInputChange('vaccineName', e.target.value)}
            className={styles.formField}
          >
            <SelectItem text={t('selectVaccine', 'Seleccione una vacuna')} value="" />
            {VACCINE_OPTIONS.map((vaccine) => (
              <SelectItem key={vaccine} text={vaccine} value={vaccine} />
            ))}
          </Select>

          <TextArea
            id="reaction-description"
            labelText={t('reactionDescription', 'Descripción de la reacción')}
            value={formData.reactionDescription}
            onChange={(e) => handleInputChange('reactionDescription', e.target.value)}
            rows={4}
            placeholder={t('reactionPlaceholder', 'Describa los síntomas observados...')}
            className={styles.formField}
          />

          <Select
            id="severity-select"
            labelText={t('severity', 'Severidad')}
            value={formData.severity}
            onChange={(e) => handleInputChange('severity', e.target.value)}
            className={styles.formField}
          >
            <SelectItem text={t('selectSeverity', 'Seleccione severidad')} value="" />
            <SelectItem text={t('mild', 'Leve')} value="mild" />
            <SelectItem text={t('moderate', 'Moderada')} value="moderate" />
            <SelectItem text={t('severe', 'Severa')} value="severe" />
          </Select>

          <DatePicker
            datePickerType="single"
            dateFormat="m/d/Y"
            value={formData.occurrenceDate}
            onChange={(dates: Date[]) => handleInputChange('occurrenceDate', dates[0]?.toISOString() || '')}
            className={styles.formField}
          >
            <DatePickerInput
              id="occurrence-date"
              labelText={t('occurrenceDate', 'Fecha de ocurrencia')}
              placeholder="mm/dd/yyyy"
            />
          </DatePicker>

          <Button type="submit" kind="primary" renderIcon={Add} className={styles.submitButton}>
            {t('registerReaction', 'Registrar Reacción')}
          </Button>
        </Form>
      </Layer>
    </Tile>
  );
};
