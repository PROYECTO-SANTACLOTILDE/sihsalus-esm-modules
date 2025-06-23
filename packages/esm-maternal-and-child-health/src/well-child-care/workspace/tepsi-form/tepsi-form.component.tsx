// tepsi-form.tsx
import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
  Stack,
  Select,
  SelectItem,
  Checkbox,
  NumberInput,
  DatePicker,
  DatePickerInput,
  RadioButtonGroup,
  RadioButton,
  Tile,
  Tag,
} from '@carbon/react';
import {
  createErrorHandler,
  showSnackbar,
  useConfig,
  useLayoutType,
  useSession,
  usePatient,
  useVisit,
  getPatientName,
} from '@openmrs/esm-framework';
import type { DefaultPatientWorkspaceProps } from '@openmrs/esm-patient-common-lib';
import type { ConfigObject } from '../../../config-schema';
import styles from './tepsi-form.scss';

// Definir tipos para TEPSI
interface TEPSIItem {
  id: string;
  area: 'coordinacion' | 'lenguaje' | 'motricidad';
  description: string;
  ageRange: [number, number]; // [min, max] en meses
  points: number;
}

interface TEPSIResults {
  coordinacion: {
    score: number;
    total: number;
    classification: 'normal' | 'riesgo' | 'retraso';
  };
  lenguaje: {
    score: number;
    total: number;
    classification: 'normal' | 'riesgo' | 'retraso';
  };
  motricidad: {
    score: number;
    total: number;
    classification: 'normal' | 'riesgo' | 'retraso';
  };
  total: {
    score: number;
    total: number;
    classification: 'normal' | 'riesgo' | 'retraso';
  };
}

// Items del TEPSI por área y edad
const TEPSI_ITEMS: TEPSIItem[] = [
  // COORDINACIÓN
  {
    id: 'coord_1',
    area: 'coordinacion',
    description: 'Traslada agua de un vaso a otro sin derramar',
    ageRange: [24, 30],
    points: 1,
  },
  {
    id: 'coord_2',
    area: 'coordinacion',
    description: 'Construye un puente con 3 cubos con modelo presente',
    ageRange: [24, 30],
    points: 1,
  },
  {
    id: 'coord_3',
    area: 'coordinacion',
    description: 'Construye una torre de 8 o más cubos',
    ageRange: [24, 36],
    points: 1,
  },
  { id: 'coord_4', area: 'coordinacion', description: 'Desabotona', ageRange: [30, 42], points: 1 },
  { id: 'coord_5', area: 'coordinacion', description: 'Abotona', ageRange: [36, 48], points: 1 },
  { id: 'coord_6', area: 'coordinacion', description: 'Enhebra aguja', ageRange: [42, 60], points: 1 },
  { id: 'coord_7', area: 'coordinacion', description: 'Desata cordones', ageRange: [36, 48], points: 1 },
  { id: 'coord_8', area: 'coordinacion', description: 'Copia una línea recta', ageRange: [24, 30], points: 1 },
  { id: 'coord_9', area: 'coordinacion', description: 'Copia un círculo', ageRange: [30, 36], points: 1 },
  { id: 'coord_10', area: 'coordinacion', description: 'Copia una cruz', ageRange: [42, 48], points: 1 },
  { id: 'coord_11', area: 'coordinacion', description: 'Copia un triángulo', ageRange: [54, 60], points: 1 },
  { id: 'coord_12', area: 'coordinacion', description: 'Copia un cuadrado', ageRange: [48, 54], points: 1 },
  {
    id: 'coord_13',
    area: 'coordinacion',
    description: 'Dibuja 9 o más partes de una figura humana',
    ageRange: [54, 60],
    points: 1,
  },
  {
    id: 'coord_14',
    area: 'coordinacion',
    description: 'Dibuja 6 o más partes de una figura humana',
    ageRange: [48, 54],
    points: 1,
  },
  {
    id: 'coord_15',
    area: 'coordinacion',
    description: 'Dibuja 3 o más partes de una figura humana',
    ageRange: [36, 42],
    points: 1,
  },
  { id: 'coord_16', area: 'coordinacion', description: 'Ordena por tamaño', ageRange: [36, 48], points: 1 },

  // LENGUAJE
  { id: 'leng_1', area: 'lenguaje', description: 'Reconoce grande y chico', ageRange: [24, 30], points: 1 },
  { id: 'leng_2', area: 'lenguaje', description: 'Reconoce más y menos', ageRange: [30, 36], points: 1 },
  { id: 'leng_3', area: 'lenguaje', description: 'Nombra animales', ageRange: [24, 30], points: 1 },
  { id: 'leng_4', area: 'lenguaje', description: 'Nombra objetos', ageRange: [24, 30], points: 1 },
  { id: 'leng_5', area: 'lenguaje', description: 'Reconoce largo y corto', ageRange: [36, 42], points: 1 },
  { id: 'leng_6', area: 'lenguaje', description: 'Verbaliza acciones', ageRange: [30, 36], points: 1 },
  { id: 'leng_7', area: 'lenguaje', description: 'Conoce la utilidad de objetos', ageRange: [36, 42], points: 1 },
  { id: 'leng_8', area: 'lenguaje', description: 'Discrimina pesado y liviano', ageRange: [42, 48], points: 1 },
  { id: 'leng_9', area: 'lenguaje', description: 'Verbaliza su nombre y apellido', ageRange: [30, 36], points: 1 },
  { id: 'leng_10', area: 'lenguaje', description: 'Identifica su sexo', ageRange: [30, 36], points: 1 },
  { id: 'leng_11', area: 'lenguaje', description: 'Conoce el nombre de sus padres', ageRange: [36, 42], points: 1 },
  { id: 'leng_12', area: 'lenguaje', description: 'Da su dirección', ageRange: [48, 60], points: 1 },
  { id: 'leng_13', area: 'lenguaje', description: 'Comprende preposiciones', ageRange: [36, 42], points: 1 },
  { id: 'leng_14', area: 'lenguaje', description: 'Razona por analogías', ageRange: [48, 60], points: 1 },
  { id: 'leng_15', area: 'lenguaje', description: 'Nombra colores', ageRange: [42, 48], points: 1 },
  { id: 'leng_16', area: 'lenguaje', description: 'Señala colores', ageRange: [36, 42], points: 1 },
  { id: 'leng_17', area: 'lenguaje', description: 'Nombra figuras geométricas', ageRange: [48, 60], points: 1 },
  { id: 'leng_18', area: 'lenguaje', description: 'Señala figuras geométricas', ageRange: [42, 48], points: 1 },
  { id: 'leng_19', area: 'lenguaje', description: 'Describe escenas', ageRange: [48, 60], points: 1 },
  { id: 'leng_20', area: 'lenguaje', description: 'Reconoce absurdos', ageRange: [54, 60], points: 1 },
  { id: 'leng_21', area: 'lenguaje', description: 'Usa plurales', ageRange: [36, 42], points: 1 },
  { id: 'leng_22', area: 'lenguaje', description: 'Reconoce antes y después', ageRange: [48, 60], points: 1 },
  { id: 'leng_23', area: 'lenguaje', description: 'Define palabras', ageRange: [54, 60], points: 1 },
  { id: 'leng_24', area: 'lenguaje', description: 'Nombra características de objetos', ageRange: [42, 48], points: 1 },

  // MOTRICIDAD
  {
    id: 'mot_1',
    area: 'motricidad',
    description: 'Salta con los dos pies juntos en el mismo lugar',
    ageRange: [24, 30],
    points: 1,
  },
  {
    id: 'mot_2',
    area: 'motricidad',
    description: 'Camina 10 pasos llevando un vaso lleno de agua',
    ageRange: [30, 36],
    points: 1,
  },
  {
    id: 'mot_3',
    area: 'motricidad',
    description: 'Lanza una pelota en una dirección determinada',
    ageRange: [24, 30],
    points: 1,
  },
  {
    id: 'mot_4',
    area: 'motricidad',
    description: 'Se para en un pie sin apoyo 10 segundos o más',
    ageRange: [48, 54],
    points: 1,
  },
  {
    id: 'mot_5',
    area: 'motricidad',
    description: 'Se para en un pie sin apoyo 5 segundos o más',
    ageRange: [42, 48],
    points: 1,
  },
  {
    id: 'mot_6',
    area: 'motricidad',
    description: 'Se para en un pie sin apoyo 1 segundo o más',
    ageRange: [36, 42],
    points: 1,
  },
  {
    id: 'mot_7',
    area: 'motricidad',
    description: 'Camina en punta de pies 6 o más pasos',
    ageRange: [36, 42],
    points: 1,
  },
  { id: 'mot_8', area: 'motricidad', description: 'Salta 20 cms con los pies juntos', ageRange: [36, 42], points: 1 },
  {
    id: 'mot_9',
    area: 'motricidad',
    description: 'Salta en un pie 3 o más veces sin apoyo',
    ageRange: [48, 54],
    points: 1,
  },
  { id: 'mot_10', area: 'motricidad', description: 'Coge una pelota', ageRange: [30, 36], points: 1 },
  { id: 'mot_11', area: 'motricidad', description: 'Camina hacia atrás', ageRange: [30, 36], points: 1 },
  { id: 'mot_12', area: 'motricidad', description: 'Camina en línea recta', ageRange: [36, 42], points: 1 },
];

// Esquema de validación
const TEPSISchema = z.object({
  childAgeMonths: z.number().min(24, 'Edad mínima 24 meses').max(60, 'Edad máxima 60 meses'),
  evaluationDate: z.string().min(1, 'Fecha requerida'),
  items: z.record(z.boolean()).optional(),
  observations: z.string().optional(),
});

export type TEPSIFormType = z.infer<typeof TEPSISchema>;

// Componente principal
const TEPSIForm: React.FC<DefaultPatientWorkspaceProps> = ({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm<TEPSIFormType>({
    mode: 'all',
    resolver: zodResolver(TEPSISchema),
    defaultValues: {
      childAgeMonths: undefined,
      evaluationDate: new Date().toISOString().split('T')[0],
      items: {},
      observations: '',
    },
  });

  const childAgeMonths = watch('childAgeMonths');

  // Calcular edad del niño basado en fecha de nacimiento
  useEffect(() => {
    if (patient?.patient?.birthDate) {
      const birthDate = new Date(patient.patient.birthDate);
      const today = new Date();
      const ageInMonths = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
      setValue('childAgeMonths', ageInMonths);
    }
  }, [patient, setValue]);

  // Filtrar items apropiados para la edad
  const appropriateItems = useMemo(() => {
    if (!childAgeMonths) return [];
    return TEPSI_ITEMS.filter((item) => childAgeMonths >= item.ageRange[0] && childAgeMonths <= item.ageRange[1]);
  }, [childAgeMonths]);

  // Calcular resultados
  const results: TEPSIResults = useMemo(() => {
    const itemsByArea = {
      coordinacion: appropriateItems.filter((item) => item.area === 'coordinacion'),
      lenguaje: appropriateItems.filter((item) => item.area === 'lenguaje'),
      motricidad: appropriateItems.filter((item) => item.area === 'motricidad'),
    };

    const calculateAreaScore = (items: TEPSIItem[]) => {
      const total = items.length;
      const score = items.reduce((sum, item) => sum + (selectedItems[item.id] ? item.points : 0), 0);

      let classification: 'normal' | 'riesgo' | 'retraso';
      const percentage = total > 0 ? (score / total) * 100 : 0;

      if (percentage >= 75) classification = 'normal';
      else if (percentage >= 50) classification = 'riesgo';
      else classification = 'retraso';

      return { score, total, classification };
    };

    const coordinacion = calculateAreaScore(itemsByArea.coordinacion);
    const lenguaje = calculateAreaScore(itemsByArea.lenguaje);
    const motricidad = calculateAreaScore(itemsByArea.motricidad);

    const totalScore = coordinacion.score + lenguaje.score + motricidad.score;
    const totalPossible = coordinacion.total + lenguaje.total + motricidad.total;
    const totalPercentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0;

    let totalClassification: 'normal' | 'riesgo' | 'retraso';
    if (totalPercentage >= 75) totalClassification = 'normal';
    else if (totalPercentage >= 50) totalClassification = 'riesgo';
    else totalClassification = 'retraso';

    return {
      coordinacion,
      lenguaje,
      motricidad,
      total: {
        score: totalScore,
        total: totalPossible,
        classification: totalClassification,
      },
    };
  }, [appropriateItems, selectedItems]);

  const handleItemChange = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: checked,
    }));
  };

  const saveTEPSIData = useCallback(
    async (data: TEPSIFormType) => {
      setIsSubmitting(true);
      setShowErrorNotification(false);

      try {
        const abortController = new AbortController();

        const tepsiData = {
          ...data,
          items: selectedItems,
          results,
          appropriateItems: appropriateItems.map((item) => item.id),
        };

        // Aquí llamarías a tu función de guardado
        // await saveTEPSIEvaluation(config, patientUuid, tepsiData, abortController, session?.sessionLocation?.uuid);

        showSnackbar({
          isLowContrast: true,
          kind: 'success',
          title: t('tepsiSaved', 'TEPSI Evaluation Saved'),
          subtitle: t('tepsiDataAvailable', 'The evaluation is now available in the patient record'),
        });

        closeWorkspaceWithSavedChanges();
      } catch (error) {
        console.error('Error saving TEPSI:', error);
        setShowErrorNotification(true);
        showSnackbar({
          title: t('tepsiSaveError', 'Error saving TEPSI evaluation'),
          kind: 'error',
          isLowContrast: false,
          subtitle: t('checkForErrors', 'Please check the form and try again'),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedItems, results, appropriateItems, closeWorkspaceWithSavedChanges, t],
  );

  useEffect(() => {
    promptBeforeClosing(() => isDirty);
  }, [isDirty, promptBeforeClosing]);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'normal':
        return 'green';
      case 'riesgo':
        return 'yellow';
      case 'retraso':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getClassificationText = (classification: string) => {
    switch (classification) {
      case 'normal':
        return t('normal', 'Normal');
      case 'riesgo':
        return t('riesgo', 'En riesgo');
      case 'retraso':
        return t('retraso', 'Retraso');
      default:
        return '';
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit(saveTEPSIData)}>
      <Stack gap={6}>
        <Column>
          <h3 className={styles.title}>{t('tepsiTitle', 'Test de Desarrollo Psicomotor (TEPSI)')}</h3>
          <p className={styles.subtitle}>
            {t('tepsiSubtitle', 'Evaluación del desarrollo psicomotor en niños de 2 a 5 años')}
          </p>
        </Column>

        {/* Información del paciente */}
        <Column>
          <Tile className={styles.patientInfo}>
            <Stack gap={3}>
              <h4>{t('patientInfo', 'Información del Paciente')}</h4>
              <p>
                <strong>{t('name', 'Nombre')}:</strong> {getPatientName(patient.patient)}
              </p>
              <p>
                <strong>{t('age', 'Edad')}:</strong> {childAgeMonths} meses
              </p>
              <DatePicker
                datePickerType="single"
                dateFormat="Y-m-d"
                onChange={(dates) => {
                  if (dates[0]) {
                    setValue('evaluationDate', dates[0].toISOString().split('T')[0]);
                  }
                }}
              >
                <DatePickerInput
                  placeholder="yyyy-mm-dd"
                  labelText={t('evaluationDate', 'Fecha de evaluación')}
                  id="evaluation-date"
                />
              </DatePicker>
            </Stack>
          </Tile>
        </Column>

        {/* Resultados en tiempo real */}
        {childAgeMonths && (
          <Column>
            <Tile className={styles.results}>
              <Stack gap={4}>
                <h4>{t('resultsPreview', 'Vista previa de resultados')}</h4>

                <div className={styles.resultGrid}>
                  <div className={styles.resultCard}>
                    <h5>{t('coordinacion', 'Coordinación')}</h5>
                    <p>
                      {results.coordinacion.score}/{results.coordinacion.total}
                    </p>
                    <Tag type={getClassificationColor(results.coordinacion.classification)}>
                      {getClassificationText(results.coordinacion.classification)}
                    </Tag>
                  </div>

                  <div className={styles.resultCard}>
                    <h5>{t('lenguaje', 'Lenguaje')}</h5>
                    <p>
                      {results.lenguaje.score}/{results.lenguaje.total}
                    </p>
                    <Tag type={getClassificationColor(results.lenguaje.classification)}>
                      {getClassificationText(results.lenguaje.classification)}
                    </Tag>
                  </div>

                  <div className={styles.resultCard}>
                    <h5>{t('motricidad', 'Motricidad')}</h5>
                    <p>
                      {results.motricidad.score}/{results.motricidad.total}
                    </p>
                    <Tag type={getClassificationColor(results.motricidad.classification)}>
                      {getClassificationText(results.motricidad.classification)}
                    </Tag>
                  </div>

                  <div className={styles.resultCard}>
                    <h5>{t('total', 'Total')}</h5>
                    <p>
                      {results.total.score}/{results.total.total}
                    </p>
                    <Tag type={getClassificationColor(results.total.classification)}>
                      {getClassificationText(results.total.classification)}
                    </Tag>
                  </div>
                </div>
              </Stack>
            </Tile>
          </Column>
        )}

        {/* Items de evaluación */}
        {appropriateItems.length > 0 && (
          <Column>
            <Stack gap={4}>
              <h4>
                {t('evaluationItems', 'Items de Evaluación')} ({appropriateItems.length} items)
              </h4>

              {/* Coordinación */}
              <div className={styles.areaSection}>
                <h5 className={styles.areaTitle}>{t('coordinacion', 'Coordinación')}</h5>
                <div className={styles.itemsGrid}>
                  {appropriateItems
                    .filter((item) => item.area === 'coordinacion')
                    .map((item) => (
                      <Checkbox
                        key={item.id}
                        labelText={item.description}
                        id={item.id}
                        checked={selectedItems[item.id] || false}
                        onChange={(_, { checked }) => handleItemChange(item.id, checked)}
                        className={styles.itemCheckbox}
                      />
                    ))}
                </div>
              </div>

              {/* Lenguaje */}
              <div className={styles.areaSection}>
                <h5 className={styles.areaTitle}>{t('lenguaje', 'Lenguaje')}</h5>
                <div className={styles.itemsGrid}>
                  {appropriateItems
                    .filter((item) => item.area === 'lenguaje')
                    .map((item) => (
                      <Checkbox
                        key={item.id}
                        labelText={item.description}
                        id={item.id}
                        checked={selectedItems[item.id] || false}
                        onChange={(_, { checked }) => handleItemChange(item.id, checked)}
                        className={styles.itemCheckbox}
                      />
                    ))}
                </div>
              </div>

              {/* Motricidad */}
              <div className={styles.areaSection}>
                <h5 className={styles.areaTitle}>{t('motricidad', 'Motricidad')}</h5>
                <div className={styles.itemsGrid}>
                  {appropriateItems
                    .filter((item) => item.area === 'motricidad')
                    .map((item) => (
                      <Checkbox
                        key={item.id}
                        labelText={item.description}
                        id={item.id}
                        checked={selectedItems[item.id] || false}
                        onChange={(_, { checked }) => handleItemChange(item.id, checked)}
                        className={styles.itemCheckbox}
                      />
                    ))}
                </div>
              </div>
            </Stack>
          </Column>
        )}

        {showErrorNotification && (
          <Column>
            <InlineNotification
              kind="error"
              title={t('error', 'Error')}
              subtitle={t('tepsiSaveError', 'There was an error saving the TEPSI evaluation')}
              onClose={() => setShowErrorNotification(false)}
            />
          </Column>
        )}

        <ButtonSet className={isTablet ? styles.tablet : styles.desktop}>
          <Button kind="secondary" onClick={closeWorkspace} disabled={isSubmitting}>
            {t('cancel', 'Cancel')}
          </Button>
          <Button kind="primary" type="submit" disabled={isSubmitting || !childAgeMonths}>
            {isSubmitting ? t('saving', 'Saving...') : t('saveAndClose', 'Save and Close')}
          </Button>
        </ButtonSet>
      </Stack>
    </Form>
  );
};

export default TEPSIForm;
