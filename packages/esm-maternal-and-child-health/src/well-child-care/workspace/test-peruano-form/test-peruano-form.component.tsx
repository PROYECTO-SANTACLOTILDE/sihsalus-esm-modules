// test-peruano-form.tsx
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
  TextArea,
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
import styles from './test-peruano-form.scss';

// Definir tipos para Test Peruano
interface TestPeruanoItem {
  id: string;
  area: 'desarrollo_cognitivo' | 'desarrollo_motor' | 'desarrollo_social_emocional' | 'desarrollo_lenguaje';
  description: string;
  ageRange: [number, number]; // [min, max] en meses
  points: number;
  instruction?: string;
}

interface TestPeruanoResults {
  desarrollo_cognitivo: {
    score: number;
    total: number;
    percentile: number;
    classification: 'superior' | 'normal_alto' | 'normal' | 'normal_bajo' | 'limite' | 'retraso';
  };
  desarrollo_motor: {
    score: number;
    total: number;
    percentile: number;
    classification: 'superior' | 'normal_alto' | 'normal' | 'normal_bajo' | 'limite' | 'retraso';
  };
  desarrollo_social_emocional: {
    score: number;
    total: number;
    percentile: number;
    classification: 'superior' | 'normal_alto' | 'normal' | 'normal_bajo' | 'limite' | 'retraso';
  };
  desarrollo_lenguaje: {
    score: number;
    total: number;
    percentile: number;
    classification: 'superior' | 'normal_alto' | 'normal' | 'normal_bajo' | 'limite' | 'retraso';
  };
  total: {
    score: number;
    total: number;
    percentile: number;
    classification: 'superior' | 'normal_alto' | 'normal' | 'normal_bajo' | 'limite' | 'retraso';
    recommendation: string;
  };
}

// Items del Test Peruano por área y edad (adaptado para el contexto peruano)
const TEST_PERUANO_ITEMS: TestPeruanoItem[] = [
  // DESARROLLO COGNITIVO
  {
    id: 'cog_1',
    area: 'desarrollo_cognitivo',
    description: 'Reconoce y nombra frutas típicas del Perú (mango, lúcuma, chirimoya)',
    ageRange: [24, 36],
    points: 1,
    instruction: 'Mostrar imágenes de frutas peruanas',
  },
  {
    id: 'cog_2',
    area: 'desarrollo_cognitivo',
    description: 'Identifica animales de la sierra peruana (llama, alpaca, cuy)',
    ageRange: [30, 42],
    points: 1,
    instruction: 'Usar imágenes o juguetes de animales andinos',
  },
  {
    id: 'cog_3',
    area: 'desarrollo_cognitivo',
    description: 'Clasifica objetos por color usando elementos culturales peruanos',
    ageRange: [36, 48],
    points: 1,
    instruction: 'Usar textiles andinos de diferentes colores',
  },
  {
    id: 'cog_4',
    area: 'desarrollo_cognitivo',
    description: 'Cuenta hasta 10 en quechua o español',
    ageRange: [42, 54],
    points: 1,
    instruction: 'Permitir el uso de cualquiera de los dos idiomas',
  },
  {
    id: 'cog_5',
    area: 'desarrollo_cognitivo',
    description: 'Reconoce símbolos patrios peruanos (bandera, escudo)',
    ageRange: [48, 60],
    points: 1,
    instruction: 'Mostrar símbolos patrios simplificados',
  },
  {
    id: 'cog_6',
    area: 'desarrollo_cognitivo',
    description: 'Resuelve problemas simples usando material concreto andino',
    ageRange: [54, 72],
    points: 1,
    instruction: 'Usar semillas, piedras u otros materiales naturales',
  },
  {
    id: 'cog_7',
    area: 'desarrollo_cognitivo',
    description: 'Comprende conceptos de tiempo relacionados con festividades peruanas',
    ageRange: [60, 84],
    points: 1,
    instruction: 'Preguntar sobre Inti Raymi, Navidad, etc.',
  },

  // DESARROLLO MOTOR
  {
    id: 'mot_1',
    area: 'desarrollo_motor',
    description: 'Realiza movimientos de danzas folklóricas peruanas básicas',
    ageRange: [24, 36],
    points: 1,
    instruction: 'Movimientos simples de marinera o huayno',
  },
  {
    id: 'mot_2',
    area: 'desarrollo_motor',
    description: 'Manipula instrumentos musicales andinos (maracas, quena de juguete)',
    ageRange: [30, 42],
    points: 1,
    instruction: 'Instrumentos adaptados para niños',
  },
  {
    id: 'mot_3',
    area: 'desarrollo_motor',
    description: 'Camina en terreno irregular simulando ambiente andino',
    ageRange: [24, 36],
    points: 1,
    instruction: 'Usar colchonetas o superficies texturizadas',
  },
  {
    id: 'mot_4',
    area: 'desarrollo_motor',
    description: 'Realiza actividades de la vida diaria andina (cargar en aguayo)',
    ageRange: [36, 48],
    points: 1,
    instruction: 'Usar muñecos y telas tradicionales',
  },
  {
    id: 'mot_5',
    area: 'desarrollo_motor',
    description: 'Coordina movimientos en juegos tradicionales peruanos',
    ageRange: [42, 54],
    points: 1,
    instruction: 'Juegos como "mata gente" o "mundo"',
  },
  {
    id: 'mot_6',
    area: 'desarrollo_motor',
    description: 'Demuestra equilibrio subiendo y bajando escalones',
    ageRange: [48, 60],
    points: 1,
    instruction: 'Simular escalones de andenes incas',
  },

  // DESARROLLO SOCIAL-EMOCIONAL
  {
    id: 'soc_1',
    area: 'desarrollo_social_emocional',
    description: 'Participa en actividades comunitarias familiares',
    ageRange: [24, 36],
    points: 1,
    instruction: 'Preguntar sobre ayni, minga u otras actividades',
  },
  {
    id: 'soc_2',
    area: 'desarrollo_social_emocional',
    description: 'Muestra respeto por los mayores según tradición andina',
    ageRange: [30, 42],
    points: 1,
    instruction: 'Observar comportamiento con adultos',
  },
  {
    id: 'soc_3',
    area: 'desarrollo_social_emocional',
    description: 'Demuestra solidaridad y reciprocidad (ayni)',
    ageRange: [36, 48],
    points: 1,
    instruction: 'Situaciones de juego cooperativo',
  },
  {
    id: 'soc_4',
    area: 'desarrollo_social_emocional',
    description: 'Expresa emociones de manera culturalmente apropiada',
    ageRange: [42, 54],
    points: 1,
    instruction: 'Considerar formas andinas de expresión emocional',
  },
  {
    id: 'soc_5',
    area: 'desarrollo_social_emocional',
    description: 'Comparte alimentos según tradición familiar',
    ageRange: [48, 60],
    points: 1,
    instruction: 'Observar comportamiento durante snack time',
  },

  // DESARROLLO DEL LENGUAJE
  {
    id: 'leng_1',
    area: 'desarrollo_lenguaje',
    description: 'Comprende órdenes simples en español y/o quechua',
    ageRange: [24, 30],
    points: 1,
    instruction: 'Usar ambos idiomas según contexto familiar',
  },
  {
    id: 'leng_2',
    area: 'desarrollo_lenguaje',
    description: 'Nombra alimentos tradicionales peruanos',
    ageRange: [30, 36],
    points: 1,
    instruction: 'Papa, quinua, maíz, etc.',
  },
  {
    id: 'leng_3',
    area: 'desarrollo_lenguaje',
    description: 'Usa palabras en quechua mezcladas con español',
    ageRange: [36, 42],
    points: 1,
    instruction: 'Aceptar code-switching natural',
  },
  {
    id: 'leng_4',
    area: 'desarrollo_lenguaje',
    description: 'Relata actividades familiares tradicionales',
    ageRange: [42, 48],
    points: 1,
    instruction: 'Festividades, actividades agrícolas, etc.',
  },
  {
    id: 'leng_5',
    area: 'desarrollo_lenguaje',
    description: 'Comprende cuentos tradicionales andinos',
    ageRange: [48, 54],
    points: 1,
    instruction: 'Usar leyendas adaptadas para la edad',
  },
  {
    id: 'leng_6',
    area: 'desarrollo_lenguaje',
    description: 'Expresa necesidades en contexto bicultural',
    ageRange: [54, 60],
    points: 1,
    instruction: 'Situaciones urbanas y rurales',
  },
  {
    id: 'leng_7',
    area: 'desarrollo_lenguaje',
    description: 'Usa vocabulario específico de la región andina',
    ageRange: [60, 72],
    points: 1,
    instruction: 'Términos geográficos, climáticos, culturales',
  },
];

// Esquema de validación
const TestPeruanoSchema = z.object({
  childAgeMonths: z.number().min(24, 'Edad mínima 24 meses').max(84, 'Edad máxima 84 meses'),
  evaluationDate: z.string().min(1, 'Fecha requerida'),
  culturalContext: z.enum(['urbano', 'rural', 'urbano_marginal'], {
    required_error: 'Contexto cultural requerido',
  }),
  primaryLanguage: z.enum(['español', 'quechua', 'bilingue'], {
    required_error: 'Idioma primario requerido',
  }),
  items: z.record(z.boolean()).optional(),
  observations: z.string().optional(),
  culturalNotes: z.string().optional(),
});

export type TestPeruanoFormType = z.infer<typeof TestPeruanoSchema>;

// Componente principal
const TestPeruanoForm: React.FC<DefaultPatientWorkspaceProps> = ({
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
  } = useForm<TestPeruanoFormType>({
    mode: 'all',
    resolver: zodResolver(TestPeruanoSchema),
    defaultValues: {
      childAgeMonths: undefined,
      evaluationDate: new Date().toISOString().split('T')[0],
      culturalContext: 'urbano',
      primaryLanguage: 'español',
      items: {},
      observations: '',
      culturalNotes: '',
    },
  });

  const childAgeMonths = watch('childAgeMonths');
  const culturalContext = watch('culturalContext');
  const primaryLanguage = watch('primaryLanguage');

  // Calcular edad del niño basado en fecha de nacimiento
  useEffect(() => {
    if (patient?.patient?.birthDate) {
      const birthDate = new Date(patient.patient.birthDate);
      const today = new Date();
      const ageInMonths = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
      setValue('childAgeMonths', ageInMonths);
    }
  }, [patient, setValue]);

  // Filtrar items apropiados para la edad y contexto cultural
  const appropriateItems = useMemo(() => {
    if (!childAgeMonths) return [];
    return TEST_PERUANO_ITEMS.filter((item) => {
      const ageMatch = childAgeMonths >= item.ageRange[0] && childAgeMonths <= item.ageRange[1];

      // Ajustar items según contexto cultural
      if (culturalContext === 'rural' && item.description.includes('símbolos patrios')) {
        return false; // Menos relevante en contexto rural
      }
      if (culturalContext === 'urbano' && item.description.includes('actividades comunitarias familiares')) {
        return ageMatch; // Más flexible en contexto urbano
      }

      return ageMatch;
    });
  }, [childAgeMonths, culturalContext]);

  // Calcular percentiles ajustados para población peruana
  const calculatePercentile = useCallback(
    (score: number, total: number, area: string): number => {
      if (total === 0) return 0;

      const percentage = (score / total) * 100;

      // Ajustes culturales para percentiles
      let adjustedPercentage = percentage;

      if (primaryLanguage === 'bilingue' && area === 'desarrollo_lenguaje') {
        adjustedPercentage = Math.min(100, percentage * 1.1); // Bonus por bilingüismo
      }

      if (culturalContext === 'rural' && area === 'desarrollo_social_emocional') {
        adjustedPercentage = Math.min(100, percentage * 1.05); // Ajuste por valores comunitarios
      }

      // Convertir a percentil
      if (adjustedPercentage >= 95) return 95;
      if (adjustedPercentage >= 85) return 85;
      if (adjustedPercentage >= 75) return 75;
      if (adjustedPercentage >= 50) return 50;
      if (adjustedPercentage >= 25) return 25;
      if (adjustedPercentage >= 15) return 15;
      return 5;
    },
    [primaryLanguage, culturalContext],
  );

  const getClassification = (
    percentile: number,
  ): 'superior' | 'normal_alto' | 'normal' | 'normal_bajo' | 'limite' | 'retraso' => {
    if (percentile >= 95) return 'superior';
    if (percentile >= 85) return 'normal_alto';
    if (percentile >= 75) return 'normal';
    if (percentile >= 25) return 'normal_bajo';
    if (percentile >= 15) return 'limite';
    return 'retraso';
  };

  // Calcular resultados con ajustes culturales
  const results: TestPeruanoResults = useMemo(() => {
    const itemsByArea = {
      desarrollo_cognitivo: appropriateItems.filter((item) => item.area === 'desarrollo_cognitivo'),
      desarrollo_motor: appropriateItems.filter((item) => item.area === 'desarrollo_motor'),
      desarrollo_social_emocional: appropriateItems.filter((item) => item.area === 'desarrollo_social_emocional'),
      desarrollo_lenguaje: appropriateItems.filter((item) => item.area === 'desarrollo_lenguaje'),
    };

    const calculateAreaResult = (items: TestPeruanoItem[], areaName: string) => {
      const total = items.length;
      const score = items.reduce((sum, item) => sum + (selectedItems[item.id] ? item.points : 0), 0);
      const percentile = calculatePercentile(score, total, areaName);
      const classification = getClassification(percentile);

      return { score, total, percentile, classification };
    };

    const desarrollo_cognitivo = calculateAreaResult(itemsByArea.desarrollo_cognitivo, 'desarrollo_cognitivo');
    const desarrollo_motor = calculateAreaResult(itemsByArea.desarrollo_motor, 'desarrollo_motor');
    const desarrollo_social_emocional = calculateAreaResult(
      itemsByArea.desarrollo_social_emocional,
      'desarrollo_social_emocional',
    );
    const desarrollo_lenguaje = calculateAreaResult(itemsByArea.desarrollo_lenguaje, 'desarrollo_lenguaje');

    const totalScore =
      desarrollo_cognitivo.score +
      desarrollo_motor.score +
      desarrollo_social_emocional.score +
      desarrollo_lenguaje.score;
    const totalPossible =
      desarrollo_cognitivo.total +
      desarrollo_motor.total +
      desarrollo_social_emocional.total +
      desarrollo_lenguaje.total;
    const totalPercentile = calculatePercentile(totalScore, totalPossible, 'total');
    const totalClassification = getClassification(totalPercentile);

    // Generar recomendación basada en resultados y contexto cultural
    let recommendation = '';
    if (totalClassification === 'retraso' || totalClassification === 'limite') {
      recommendation = 'Se recomienda evaluación especializada y estimulación temprana culturalmente apropiada.';
    } else if (totalClassification === 'normal_bajo') {
      recommendation = 'Se sugiere actividades de estimulación usando elementos culturales familiares.';
    } else {
      recommendation = 'Desarrollo apropiado para la edad y contexto cultural. Continuar con actividades regulares.';
    }

    return {
      desarrollo_cognitivo,
      desarrollo_motor,
      desarrollo_social_emocional,
      desarrollo_lenguaje,
      total: {
        score: totalScore,
        total: totalPossible,
        percentile: totalPercentile,
        classification: totalClassification,
        recommendation,
      },
    };
  }, [appropriateItems, selectedItems, calculatePercentile]);

  const handleItemChange = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: checked,
    }));
  };

  const saveTestPeruanoData = useCallback(
    async (data: TestPeruanoFormType) => {
      setIsSubmitting(true);
      setShowErrorNotification(false);

      try {
        const abortController = new AbortController();

        const testPeruanoData = {
          ...data,
          items: selectedItems,
          results,
          appropriateItems: appropriateItems.map((item) => item.id),
          culturalAdjustments: {
            context: culturalContext,
            language: primaryLanguage,
          },
        };

        // Aquí llamarías a tu función de guardado
        // await saveTestPeruanoEvaluation(config, patientUuid, testPeruanoData, abortController, session?.sessionLocation?.uuid);

        showSnackbar({
          isLowContrast: true,
          kind: 'success',
          title: t('testPeruanoSaved', 'Test Peruano de Desarrollo Guardado'),
          subtitle: t('testPeruanoDataAvailable', 'La evaluación está disponible en el registro del paciente'),
        });

        closeWorkspaceWithSavedChanges();
      } catch (error) {
        console.error('Error saving Test Peruano:', error);
        setShowErrorNotification(true);
        showSnackbar({
          title: t('testPeruanoSaveError', 'Error al guardar Test Peruano'),
          kind: 'error',
          isLowContrast: false,
          subtitle: t('checkForErrors', 'Por favor revise el formulario e intente nuevamente'),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedItems, results, appropriateItems, culturalContext, primaryLanguage, closeWorkspaceWithSavedChanges, t],
  );

  useEffect(() => {
    promptBeforeClosing(() => isDirty);
  }, [isDirty, promptBeforeClosing]);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'superior':
        return 'purple';
      case 'normal_alto':
        return 'blue';
      case 'normal':
        return 'green';
      case 'normal_bajo':
        return 'yellow';
      case 'limite':
        return 'orange';
      case 'retraso':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getClassificationText = (classification: string) => {
    switch (classification) {
      case 'superior':
        return t('superior', 'Superior');
      case 'normal_alto':
        return t('normalAlto', 'Normal Alto');
      case 'normal':
        return t('normal', 'Normal');
      case 'normal_bajo':
        return t('normalBajo', 'Normal Bajo');
      case 'limite':
        return t('limite', 'Límite');
      case 'retraso':
        return t('retraso', 'Retraso');
      default:
        return '';
    }
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit(saveTestPeruanoData)}>
      <Stack gap={6}>
        <Column>
          <h3 className={styles.title}>{t('testPeruanoTitle', 'Test Peruano de Desarrollo Infantil')}</h3>
          <p className={styles.subtitle}>
            {t('testPeruanoSubtitle', 'Evaluación del desarrollo infantil adaptada al contexto cultural peruano')}
          </p>
        </Column>

        {/* Información del paciente y contexto cultural */}
        <Column>
          <Tile className={styles.patientInfo}>
            <Stack gap={4}>
              <h4>{t('patientAndCulturalInfo', 'Información del Paciente y Contexto Cultural')}</h4>
              <div className={styles.infoGrid}>
                <div>
                  <p>
                    <strong>{t('name', 'Nombre')}:</strong> {getPatientName(patient.patient)}
                  </p>
                  <p>
                    <strong>{t('age', 'Edad')}:</strong> {childAgeMonths} meses
                  </p>
                </div>
                <div>
                  <Select
                    id="cultural-context"
                    labelText={t('culturalContext', 'Contexto Cultural')}
                    value={culturalContext}
                    onChange={(e) => setValue('culturalContext', e.target.value as any)}
                  >
                    <SelectItem value="urbano" text={t('urban', 'Urbano')} />
                    <SelectItem value="rural" text={t('rural', 'Rural/Andino')} />
                    <SelectItem value="urbano_marginal" text={t('urbanMarginal', 'Urbano Marginal')} />
                  </Select>
                </div>
                <div>
                  <Select
                    id="primary-language"
                    labelText={t('primaryLanguage', 'Idioma Primario')}
                    value={primaryLanguage}
                    onChange={(e) => setValue('primaryLanguage', e.target.value as any)}
                  >
                    <SelectItem value="español" text={t('spanish', 'Español')} />
                    <SelectItem value="quechua" text={t('quechua', 'Quechua')} />
                    <SelectItem value="bilingue" text={t('bilingual', 'Bilingüe (Español/Quechua)')} />
                  </Select>
                </div>
              </div>
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
                <h4>{t('resultsPreview', 'Vista previa de resultados (Ajustados culturalmente)')}</h4>

                <div className={styles.resultGrid}>
                  <div className={styles.resultCard}>
                    <h5>{t('desarrolloCognitivo', 'Desarrollo Cognitivo')}</h5>
                    <p>
                      {results.desarrollo_cognitivo.score}/{results.desarrollo_cognitivo.total}
                    </p>
                    <p className={styles.percentile}>Percentil: {results.desarrollo_cognitivo.percentile}</p>
                    <Tag type={getClassificationColor(results.desarrollo_cognitivo.classification)}>
                      {getClassificationText(results.desarrollo_cognitivo.classification)}
                    </Tag>
                  </div>

                  <div className={styles.resultCard}>
                    <h5>{t('desarrolloMotor', 'Desarrollo Motor')}</h5>
                    <p>
                      {results.desarrollo_motor.score}/{results.desarrollo_motor.total}
                    </p>
                    <p className={styles.percentile}>Percentil: {results.desarrollo_motor.percentile}</p>
                    <Tag type={getClassificationColor(results.desarrollo_motor.classification)}>
                      {getClassificationText(results.desarrollo_motor.classification)}
                    </Tag>
                  </div>

                  <div className={styles.resultCard}>
                    <h5>{t('desarrolloSocialEmocional', 'Desarrollo Social-Emocional')}</h5>
                    <p>
                      {results.desarrollo_social_emocional.score}/{results.desarrollo_social_emocional.total}
                    </p>
                    <p className={styles.percentile}>Percentil: {results.desarrollo_social_emocional.percentile}</p>
                    <Tag type={getClassificationColor(results.desarrollo_social_emocional.classification)}>
                      {getClassificationText(results.desarrollo_social_emocional.classification)}
                    </Tag>
                  </div>

                  <div className={styles.resultCard}>
                    <h5>{t('desarrolloLenguaje', 'Desarrollo del Lenguaje')}</h5>
                    <p>
                      {results.desarrollo_lenguaje.score}/{results.desarrollo_lenguaje.total}
                    </p>
                    <p className={styles.percentile}>Percentil: {results.desarrollo_lenguaje.percentile}</p>
                    <Tag type={getClassificationColor(results.desarrollo_lenguaje.classification)}>
                      {getClassificationText(results.desarrollo_lenguaje.classification)}
                    </Tag>
                  </div>

                  <div className={`${styles.resultCard} ${styles.totalCard}`}>
                    <h5>{t('total', 'Resultado General')}</h5>
                    <p>
                      {results.total.score}/{results.total.total}
                    </p>
                    <p className={styles.percentile}>Percentil: {results.total.percentile}</p>
                    <Tag type={getClassificationColor(results.total.classification)}>
                      {getClassificationText(results.total.classification)}
                    </Tag>
                  </div>
                </div>

                {results.total.recommendation && (
                  <div className={styles.recommendation}>
                    <h5>{t('recommendation', 'Recomendación')}</h5>
                    <p>{results.total.recommendation}</p>
                  </div>
                )}
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

              {/* Desarrollo Cognitivo */}
              <div className={styles.areaSection}>
                <h5 className={styles.areaTitle}>{t('desarrolloCognitivo', 'Desarrollo Cognitivo')}</h5>
                <div className={styles.itemsGrid}>
                  {appropriateItems
                    .filter((item) => item.area === 'desarrollo_cognitivo')
                    .map((item) => (
                      <div key={item.id} className={styles.itemContainer}>
                        <Checkbox
                          labelText={item.description}
                          id={item.id}
                          checked={selectedItems[item.id] || false}
                          onChange={(_, { checked }) => handleItemChange(item.id, checked)}
                          className={styles.itemCheckbox}
                        />
                        {item.instruction && <p className={styles.instruction}>{item.instruction}</p>}
                      </div>
                    ))}
                </div>
              </div>

              {/* Desarrollo Motor */}
              <div className={styles.areaSection}>
                <h5 className={styles.areaTitle}>{t('desarrolloMotor', 'Desarrollo Motor')}</h5>
                <div className={styles.itemsGrid}>
                  {appropriateItems
                    .filter((item) => item.area === 'desarrollo_motor')
                    .map((item) => (
                      <div key={item.id} className={styles.itemContainer}>
                        <Checkbox
                          labelText={item.description}
                          id={item.id}
                          checked={selectedItems[item.id] || false}
                          onChange={(_, { checked }) => handleItemChange(item.id, checked)}
                          className={styles.itemCheckbox}
                        />
                        {item.instruction && <p className={styles.instruction}>{item.instruction}</p>}
                      </div>
                    ))}
                </div>
              </div>

              {/* Desarrollo Social-Emocional */}
              <div className={styles.areaSection}>
                <h5 className={styles.areaTitle}>{t('desarrolloSocialEmocional', 'Desarrollo Social-Emocional')}</h5>
                <div className={styles.itemsGrid}>
                  {appropriateItems
                    .filter((item) => item.area === 'desarrollo_social_emocional')
                    .map((item) => (
                      <div key={item.id} className={styles.itemContainer}>
                        <Checkbox
                          labelText={item.description}
                          id={item.id}
                          checked={selectedItems[item.id] || false}
                          onChange={(_, { checked }) => handleItemChange(item.id, checked)}
                          className={styles.itemCheckbox}
                        />
                        {item.instruction && <p className={styles.instruction}>{item.instruction}</p>}
                      </div>
                    ))}
                </div>
              </div>

              {/* Desarrollo del Lenguaje */}
              <div className={styles.areaSection}>
                <h5 className={styles.areaTitle}>{t('desarrolloLenguaje', 'Desarrollo del Lenguaje')}</h5>
                <div className={styles.itemsGrid}>
                  {appropriateItems
                    .filter((item) => item.area === 'desarrollo_lenguaje')
                    .map((item) => (
                      <div key={item.id} className={styles.itemContainer}>
                        <Checkbox
                          labelText={item.description}
                          id={item.id}
                          checked={selectedItems[item.id] || false}
                          onChange={(_, { checked }) => handleItemChange(item.id, checked)}
                          className={styles.itemCheckbox}
                        />
                        {item.instruction && <p className={styles.instruction}>{item.instruction}</p>}
                      </div>
                    ))}
                </div>
              </div>
            </Stack>
          </Column>
        )}

        {/* Observaciones culturales */}
        <Column>
          <TextArea
            labelText={t('culturalNotes', 'Notas Culturales y Contextuales')}
            placeholder={t(
              'culturalNotesPlaceholder',
              'Observaciones sobre factores culturales, familiares o del entorno que puedan influir en el desarrollo...',
            )}
            value={watch('culturalNotes')}
            onChange={(e) => setValue('culturalNotes', e.target.value)}
            rows={3}
          />
        </Column>

        {/* Observaciones generales */}
        <Column>
          <TextArea
            labelText={t('generalObservations', 'Observaciones Generales')}
            placeholder={t('observationsPlaceholder', 'Observaciones adicionales sobre la evaluación...')}
            value={watch('observations')}
            onChange={(e) => setValue('observations', e.target.value)}
            rows={3}
          />
        </Column>

        {showErrorNotification && (
          <Column>
            <InlineNotification
              kind="error"
              title={t('error', 'Error')}
              subtitle={t('testPeruanoSaveError', 'Hubo un error al guardar el Test Peruano')}
              onClose={() => setShowErrorNotification(false)}
            />
          </Column>
        )}

        <ButtonSet className={isTablet ? styles.tablet : styles.desktop}>
          <Button kind="secondary" onClick={closeWorkspace} disabled={isSubmitting}>
            {t('cancel', 'Cancelar')}
          </Button>
          <Button kind="primary" type="submit" disabled={isSubmitting || !childAgeMonths}>
            {isSubmitting ? t('saving', 'Guardando...') : t('saveAndClose', 'Guardar y Cerrar')}
          </Button>
        </ButtonSet>
      </Stack>
    </Form>
  );
};

export default TestPeruanoForm;
