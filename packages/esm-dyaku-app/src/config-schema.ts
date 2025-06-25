import { Type } from '@openmrs/esm-framework';

// ===============================
// MAIN CONFIGURATION SCHEMA
// ===============================

export const configSchema = {
  conditionPageSize: {
    _type: Type.Number,
    _description: 'The default page size for the conditions',
    _default: 5,
  },
  conditionConceptClassUuid: {
    _type: Type.ConceptUuid,
    _description: 'Concept class UUID for condition concepts',
    _default: '8d4918b0-c2cc-11de-8d13-0010c6dffd0f',
  },
  // CONCEPT SETS FOR CONDITIONS
  conditionConceptSets: {
    _type: Type.Object,
    _description: 'ConceptSets for different condition categories',
    _default: {
      antecedentesPatologicos: {
        uuid: 'c33ef45d-aa69-4d9a-9214-1dbb52609601',
        title: 'Antecedentes Patológicos del Menor',
        description: 'ConceptSet para antecedentes patológicos en menores',
      },
    },
  },
  // 1. ENCOUNTER TYPES
  encounterTypes: {
    _type: Type.Object,
    _description: 'List of encounter type UUIDs',
    _default: {
      //
      alojamientoConjunto: '984baa36-ee50-4693-92dd-82145be4847e',
      // Core Encounters
      externalConsultation: '1a2b3c4d-1234-5678-9101-abcdefghij01',
      specializedConsultation: '2b3c4d5e-2234-5678-9101-abcdefghij02',
      triage: '67a71486-1a54-468f-ac3e-7091a9a79584',
      emergencyCare: '6f7g8h9i-6234-5678-9101-abcdefghij06',

      // Hospitalization
      hospitalization: '4d5e6f7g-4234-5678-9101-abcdefghij04',
      hospitalDischarge: '5e6f7g8h-5234-5678-9101-abcdefghij05',
      bedAssignment: '7q8r9s0t-7234-5678-9101-abcdefghij17',
      intraHospitalTransfer: '6p7q8r9s-6234-5678-9101-abcdefghij16',
      hospitalizationProgressNote: '8r9s0t1u-8234-5678-9101-abcdefghij18',

      // Maternal Health
      prenatalControl: '58a87b85-cb6c-4a4c-bc5f-0a2d1e0ff8ba',
      postnatalControl: '2v3w4x5y-2234-5678-9101-abcdefghij22',
      deliveryRoomCare: '7g8h9i0j-7234-5678-9101-abcdefghij07',
      obstetricUltrasound: '8b9c0d1e-8234-5678-9101-abcdefghij28',
      antecedentesPerinatales: 'a99e704f-46f6-4461-937d-606481fb0fc3',

      // Child Health
      healthyChildControl: '3w4x5y6z-3234-5678-9101-abcdefghij23',
      atencionInmediata: '83c8d2d0-4758-43b5-bba7-04aac5c08a07',
      cefaloCaudal: 'e0a6cba3-fa9c-4bf0-90b7-9d4d48401d1c',
      consejeriaMaterna: 'f90ac51d-bc0b-4551-a6f2-358e1a47751f',

      // Specialized Care
      dentalCare: '4x5y6z7a-4234-5678-9101-abcdefghij24',
      mentalHealthEvaluation: '9i0j1k2l-9234-5678-9101-abcdefghij09',
      malnutritionAnemiaCare: '7a8b9c0d-7234-5678-9101-abcdefghij27',
      chronicDiseaseFollowup: '8h9i0j1k-8234-5678-9101-abcdefghij08',
      hivTestingServices: '8h9i0j1k-8234-5678-9101-abcdefghij08',
      tbTreatmentSupervision: '6z7a8b9c-6234-5678-9101-abcdefghij26',
      covid19Management: '9c0d1e2f-9234-5678-9101-abcdefghij29',

      // Medical Services
      medicationPrescriptionDispensation: '0j1k2l3m-0234-5678-9101-abcdefghij10',
      labResults: '1k2l3m4n-1234-5678-9101-abcdefghij11',
      vaccinationAdministration: '29c02aff-9a93-46c9-bf6f-48b552fcb1fa',
      electiveAmbulatorySurgery: '0d1e2f3g-0234-5678-9101-abcdefghij30',

      // Administrative
      consultation: '4n5o6p7q-4234-5678-9101-abcdefghij14',
      referralCounterReferral: '5o6p7q8r-5234-5678-9101-abcdefghij15',
      transferRequest: '9s0t1u2v-9234-5678-9101-abcdefghij19',
      encounterCancellation: '0t1u2v3w-0234-5678-9101-abcdefghij20',
      healthEducationCounseling: '3m4n5o6p-3234-5678-9101-abcdefghij13',
      clinicalFileUpload: '5y6z7a8b-5234-5678-9101-abcdefghij25',
      order: '39da3525-afe4-45ff-8977-c53b7b359158',
    },
  },

  // 2. FORMS CONFIGURATION
  formsList: {
    _type: Type.Object,
    _description: 'List of form UUIDs',
    _default: {
      // Maternal Forms
      prenatal: 'e8f98494-af35-4bb8-9fc7-c409c8fed843',
      postNatal: '72aa78e0-ee4b-47c3-9073-26f3b9ecc4a7',
      maternalHistory: 'OBST-001-ANTECEDENTES',
      deliveryOrAbortion: 'OBST-005-PARTO O ABORTO',
      SummaryOfLaborAndPostpartum: 'HOSP-007-RESUMEN DE PARTO-POSTPARTO',
      currentPregnancy: 'OBST-002-EMBARAZO ACTUAL',
      prenatalCare: 'OBST-002-EMBARAZO ACTUAL',
      immediatePostpartumPeriod: 'OBST-006-PUERPERIO INMEDIATO',
      postpartumControl: 'OBST-009-CONTROL DE PUERPERIO',
      labourAndDelivery: '496c7cc3-0eea-4e84-a04c-2292949e2f7f',

      atencionPrenatal: 'OBST-003-ATENCIÓN PRENATAL',

      // CRED Forms
      atencionImmediataNewborn: '(Página 5) ATENCIÓN INMEDIATA DEL RECIÉN NACIDO',
      breastfeedingObservation:
        '(Página 8) Ficha de Observación del Amamantamiento de la Consejería en Lactancia Materna',
      newbornNeuroEval: '(Página 6) EVALUACIÓN CÉFALO-CAUDAL Y NEUROLÓGICO DEL RECIÉN NACIDO',
      roomingIn: '(Página 10) Alojamiento Conjunto',
      birthDetails: '(CRED) Detalles de Nacimiento',
      pregnancyDetails: '(CRED) Embarazo y Parto',

      // EEDP Forms
      eedp2Months: 'Página (30, 31, 32 y 33) EEDP (2 meses)',
      eedp5Months: 'Página (30, 31, 32 y 33) EEDP (5 meses)',
      eedp8Months: 'Página (30, 31, 32 y 33) EEDP (8 meses)',
      eedp12Months: 'Página (30, 31, 32 y 33) EEDP (12 meses)',
      eedp15Months: 'Página (30, 31, 32 y 33) EEDP (15 meses)',
      eedp18Months: 'Página (30, 31, 32 y 33) EEDP (18 meses)',
      eedp21Months: 'Página (30, 31, 32 y 33) EEDP (21 meses)',
      tepsi: '(Página 34, 35 y 36) TEPSI',

      // Assessment Forms
      riskInterview0to30: '(Página 19) PRIMERA ENTREVISTA EN BUSCA DE FACTORES DE RIESGO (0 - 30 meses)',
      childFeeding0to5: '(Página 20) Evaluación de la alimentación del niño/niña (0 - 5 meses)',
      childFeeding6to42: '(Página 20) Evaluación de la alimentación del niño/niña (6 - 42 meses)',
      childAbuseScreening: '(Página 37) Ficha de Tamizaje Violencia y maltrato infantil',

      // Clinical Forms
      nursingAssessment: '(Página 11 y 12) Valoración de Enfermería',
      medicalOrders: '(Página 13) Órdenes Médicas',
      medicalProgressNote: '(Página 14) Nota de Evolución Médica',
      epicrisis: '(Página 16) Epicrisis',
      clinicalEncounterFormUuid: 'e958f902-64df-4819-afd4-7fb061f59308',

      // HIV/HTS Forms
      defaulterTracingFormUuid: 'a1a62d1e-2def-11e9-b210-d663bd873d93',
      htsScreening: '04295648-7606-11e8-adc0-fa7ae01bbebc',
      htsInitialTest: '402dc5d7-46da-42d4-b2be-f43ea4ad87b0',
      htsRetest: 'b08471f6-0892-4bf7-ab2b-bf79797b8ea4',

      // Hospital Forms
      puerperiumLab: '(Página 4 y 5) Puerperio - Laboratorio',
      obstetricMonitor: 'HOSP-011-HOJA DE MONITORIZACIÓN OBSTÉTRICA',
      obstetricHistory: 'HOSP-002-HISTORIA CLÍNICA OBSTÉTRICA',
      obstetricProgress: 'HOSP-005-EVOLUCIÓN OBSTÉTRICA',
      obstetricAntecedents: 'OBST-001-ANTECEDENTES',
      medicalProgress: 'HOSP-004-EVOLUCIÓN MÉDICA',
      nursingNotes: 'HOSP-009-NOTAS DE ENFERMERÍA',
      therapeuticSheet: 'HOSP-008-HOJA TERAPÉUTICA',
      birthPlanForm: 'OBST-004-FICHA PLAN DE PARTO',
      vitalSignsControl: 'HOSP-001-CONTROL DE FUNCIONES VITALES',
      birthSummary: 'HOSP-007-RESUMEN DE PARTO',
      puerperiumEpicrisis: '(Página 12) Puerperio - Epicrisis',
      puerperiumDischarge: '(Página 14) Puerperio - Informe de Alta',
      clinicalHistory: 'HOSP-003-HISTORIA CLÍNICA OBSTÉTRICA',
    },
  },

  // 3. CASE MANAGEMENT
  caseManagementForms: {
    _type: Type.Array,
    _description: 'List of form and encounter UUIDs',
    _default: [
      {
        id: 'high-iit-intervention',
        title: 'High IIT Intervention Form',
        formUuid: '6817d322-f938-4f38-8ccf-caa6fa7a499f',
        encounterTypeUuid: '7a8b9c0d-7234-5678-9101-abcdefghij27',
      },
      {
        id: 'home-visit-checklist',
        title: 'Home Visit Checklist Form',
        formUuid: 'ac3152de-1728-4786-828a-7fb4db0fc384',
        encounterTypeUuid: '5o6p7q8r-5234-5678-9101-abcdefghij15',
      },
    ],
  },

  // 4. SPECIAL CLINICS
  specialClinics: {
    _type: Type.Array,
    _description: 'List of special clinics',
    _default: [
      {
        id: 'dental-clinic',
        title: 'Atención de Odontología',
        formUuid: '4x5y6z7a-4234-5678-9101-abcdefghij24',
        encounterTypeUuid: '4x5y6z7a-4234-5678-9101-abcdefghij24',
      },
      {
        id: 'psicologia-clinic',
        title: 'Psicologia',
        formUuid: '32e43fc9-6de3-48e3-aafe-3b92f167753d',
        encounterTypeUuid: '9i0j1k2l-9234-5678-9101-abcdefghij09',
      },
      {
        id: 'physiotherapy-clinic',
        title: 'Terapia Fisica',
        formUuid: 'fdada8da-75fe-44c6-93e1-782d41e5565b',
        encounterTypeUuid: '465a92f2-baf8-42e9-9612-53064be868e8',
      },
    ],
  },

  // 5. VITALS CONFIGURATION
  vitals: {
    useFormEngine: {
      _type: Type.Boolean,
      _default: false,
      _description:
        'Whether to use an Ampath form as the vitals and biometrics form. If set to true, encounterUuid and formUuid must be set as well.',
    },
    encounterTypeUuid: {
      _type: Type.UUID,
      _default: '2v3w4x5y-2234-5678-9101-abcdefghij22',
    },
    formUuid: {
      _type: Type.UUID,
      _default: '9f26aad4-244a-46ca-be49-1196df1a8c9a',
    },
    formName: {
      _type: Type.String,
      _default: 'Vitals',
    },
    useMuacColors: {
      _type: Type.Boolean,
      _default: false,
      _description: 'Whether to show/use MUAC color codes. If set to true, the input will show status colors.',
    },
    showPrintButton: {
      _type: Type.Boolean,
      _default: false,
      _description: 'Determines whether or not to display the Print button in the vitals datatable header.',
    },
    logo: {
      src: {
        _type: Type.String,
        _default: null,
        _description: 'A path or URL to an image. Defaults to the OpenMRS SVG sprite.',
      },
      alt: {
        _type: Type.String,
        _default: 'Logo',
        _description: 'Alt text, shown on hover',
      },
      name: {
        _type: Type.String,
        _default: null,
        _description: 'The organization name displayed when image is absent',
      },
    },
  },

  // 6. BIOMETRICS CONFIGURATION
  biometrics: {
    bmiUnit: {
      _type: Type.String,
      _default: 'kg / m²',
    },
  },

  // 7. CONCEPTS CONFIGURATION
  concepts: {
    // Problem and Death Concepts
    probableCauseOfDeathConceptUuid: {
      _type: Type.ConceptUuid,
      _description:
        'Probable cause of death for a given patient determined from interviewing a family member or other non-medical personnel',
      _default: '1599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    problemListConceptUuid: {
      _type: Type.ConceptUuid,
      _description: 'List of given problems for a given patient',
      _default: '1284AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // Vital Signs
    systolicBloodPressureUuid: {
      _type: Type.ConceptUuid,
      _default: '5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    temperatureUuid: {
      _type: Type.ConceptUuid,
      _default: '5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    oxygenSaturationUuid: {
      _type: Type.ConceptUuid,
      _default: '5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    weightUuid: {
      _type: Type.ConceptUuid,
      _default: '5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    respiratoryRateUuid: {
      _type: Type.ConceptUuid,
      _default: '5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // Fluid Balance
    stoolCountUuid: {
      _type: Type.ConceptUuid,
      _description: 'Number of stools per day',
      _default: 'f2f19bb7-e92f-4658-bfc9-0dbf63837cca',
    },
    stoolGramsUuid: {
      _type: Type.ConceptUuid,
      _description: 'Weight of stool output in grams',
      _default: 'e2365f75-d2d5-4950-925c-d87ad9e6c4d3',
    },
    urineCountUuid: {
      _type: Type.ConceptUuid,
      _description: 'Number of urinations per day',
      _default: 'c3dd9ed2-592e-43a7-a1e8-e010b12f1dd0',
    },
    urineGramsUuid: {
      _type: Type.ConceptUuid,
      _description: 'Urine output in grams/mL',
      _default: '4a275a66-ea18-4ee6-a967-c2bc4a2ff607',
    },
    vomitCountUuid: {
      _type: Type.ConceptUuid,
      _description: 'Number of vomiting episodes per day',
      _default: '4249ecea-d5b1-4541-ba42-48e9f2f968cd',
    },
    vomitGramsMLUuid: {
      _type: Type.ConceptUuid,
      _description: 'Vomit output in grams/mL',
      _default: 'db881ca6-26ff-46df-aac5-3f9a0efd67d4',
    },

    // Anthropometric Measurements
    heightUuid: {
      _type: Type.ConceptUuid,
      _description: 'Height or length measurement of the patient',
      _default: '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    headCircumferenceUuid: {
      _type: Type.ConceptUuid,
      _description: 'Head circumference measurement of the patient',
      _default: 'c4d39248-c896-433a-bc69-e24d04b7f0e5',
    },
    chestCircumferenceUuid: {
      _type: Type.ConceptUuid,
      _description: 'Chest circumference measurement of the patient',
      _default: '911eb398-e7de-4270-af63-e4c615ec22a9',
    },

    // Newborn Concepts
    newbornVitalSignsConceptSetUuid: {
      _type: Type.ConceptUuid,
      _description: 'Datos Vitales Recien Nacido Vivo',
      _default: 'a855816a-8bc2-43c8-9cf7-80090dabc47d',
    },

    //CRED Controls
    consultationTime: {
      _type: Type.ConceptUuid,
      _description: 'Datos Vitales Recien Nacido Vivo',
      _default: 'a855816a-8bc2-43c8-9cf7-80090dabc47d',
    },
    controlNumber: {
      _type: Type.ConceptUuid,
      _description: 'Datos Vitales Recien Nacido Vivo',
      _default: 'a855816a-8bc2-43c8-9cf7-80090dabc47d',
    },
    attendedAge: {
      _type: Type.ConceptUuid,
      _description: 'Datos Vitales Recien Nacido Vivo',
      _default: 'a855816a-8bc2-43c8-9cf7-80090dabc47d',
    },
  },

  // 8. MATERNAL HEALTH (MADRE GESTANTE)
  madreGestante: {
    // Pregnancy History
    gravidezUuid: {
      _type: Type.ConceptUuid,
      _description: 'Número total de veces que una mujer ha estado embarazada (Gravidez)',
      _default: 'ae27daee-d2f3-4df3-8e07-eff75c81872e',
    },
    partoAlTerminoUuid: {
      _type: Type.ConceptUuid,
      _description: 'Número de partos a término (≥37 semanas de gestación)',
      _default: '8795c05b-f286-4d70-a1e6-69172e676f05',
    },
    partoPrematuroUuid: {
      _type: Type.ConceptUuid,
      _description: 'Número de partos prematuros (20-36 semanas de gestación)',
      _default: 'e08c2bfd-c3c9-4b46-afcf-e83e2a12c23f',
    },
    partoAbortoUuid: {
      _type: Type.ConceptUuid,
      _description: 'Número de abortos (pérdidas antes de las 20 semanas de gestación)',
      _default: 'dbfad4ff-1b0c-4823-b80a-3864e1d81e94',
    },
    partoNacidoVivoUuid: {
      _type: Type.ConceptUuid,
      _description: 'Número de nacidos vivos',
      _default: 'b553ce85-94e2-4755-b106-3befef127133',
    },
    partoNacidoMuertoUuid: {
      _type: Type.ConceptUuid,
      _description: 'Número de nacidos muertos',
      _default: '4dc3ee54-ba0c-49e7-b907-02aa727372f4',
    },

    // Concept Sets
    gtpalConceptSetUuid: {
      _type: Type.ConceptUuid,
      _description: 'Concept set para el sistema GTPAL (Gravidez, Términos, Prematuros, Abortos, Vivos)',
      _default: '43244943-3df5-4640-a348-9131c8e47857',
    },
    riskAntecedentsConceptSetUuid: {
      _type: Type.ConceptUuid,
      _description: 'Concept set para antecedentes de riesgo en el embarazo',
      _default: 'b20b322f-3d83-45aa-8169-a4a66afaf5f2',
    },

    // Gestational Age
    EGFechaUltimaRegla: {
      _type: Type.ConceptUuid,
      _description: 'Fecha de la última menstruación (FUR) para calcular la edad gestacional',
      _default: '57634c13-00a8-4764-93ec-dab90b6d20ce',
    },
  },

  // 9. CHILD HEALTH (CRED)
  CRED: {
    // Concept Sets
    perinatalConceptSetUuid: {
      _type: Type.ConceptUuid,
      _description: 'Concept set para el seguimiento del niño sano',
      _default: 'ninio-sano-concept-set-uuid',
    },

    // Newborn Care Procedures
    profilaxisOcularUuid: {
      _type: Type.ConceptUuid,
      _description: 'Profilaxis ocular',
      _default: '10c23f60-3310-4674-9e2e-bc3aa9aecced',
    },
    administraciNDeVitaminaKUuid: {
      _type: Type.ConceptUuid,
      _description: 'Administración de Vitamina k',
      _default: '5da8b9b1-f566-411f-b50b-f634ed6321c0',
    },
    administraciNDeVitaminaKDe05MgUuid: {
      _type: Type.ConceptUuid,
      _description: 'Administración de Vitamina K de 0.5 mg',
      _default: '54da62f5-c6e0-4772-b1c4-d9fd58527d12',
    },
    administraciNDeVitaminaKDe1MgUuid: {
      _type: Type.ConceptUuid,
      _description: 'Administración de Vitamina K de 1 mg',
      _default: 'db504b68-1b34-4859-afdb-76377649c3de',
    },

    // APGAR Scores
    apgarScoreAt1MinuteUuid: {
      _type: Type.ConceptUuid,
      _description: 'APGAR score at 1 minute',
      _default: 'a2010a1f-d7ca-4d6f-9255-f53da4fa5c3f',
    },
    apgarScoreAt5MinutesUuid: {
      _type: Type.ConceptUuid,
      _description: 'APGAR score at 5 minutes',
      _default: '0f3be2f6-986f-4928-8761-b531044c1f36',
    },
    apgarScoreAt10MinutesUuid: {
      _type: Type.ConceptUuid,
      _description: 'APGAR score at 10 minutes',
      _default: 'f621e8d3-2c34-48fc-95c1-50ad0606ed68',
    },

    // Physical Examination
    weightKgUuid: {
      _type: Type.ConceptUuid,
      _description: 'Weight',
      _default: '5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    headCircumferenceUuid: {
      _type: Type.ConceptUuid,
      _description: 'Head circumference',
      _default: 'c4d39248-c896-433a-bc69-e24d04b7f0e5',
    },
    birthLengthUuid: {
      _type: Type.ConceptUuid,
      _description: 'Birth length',
      _default: '14e7654a-5448-40d8-a822-aa2438468d63',
    },
    perMetroTorCicoCmUuid: {
      _type: Type.ConceptUuid,
      _description: 'Perímetro Torácico (cm)',
      _default: '911eb398-e7de-4270-af63-e4c615ec22a9',
    },

    // Vital Signs
    temperaturaCUuid: {
      _type: Type.ConceptUuid,
      _description: 'Temperatura (C°)',
      _default: '5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    pulseUuid: {
      _type: Type.ConceptUuid,
      _description: 'Pulse',
      _default: '5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    respiratoryRateUuid: {
      _type: Type.ConceptUuid,
      _description: 'Respiratory rate',
      _default: '5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    arterialBloodOxygenSaturationPulseOximeterUuid: {
      _type: Type.ConceptUuid,
      _description: 'Arterial blood oxygen saturation (pulse oximeter)',
      _default: '5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // Neurological Assessment
    valoraciNNeurolGicaDelReciNNacidoUuid: {
      _type: Type.ConceptUuid,
      _description: 'Valoración Neurológica del Recién Nacido',
      _default: '7378ae3c-4a25-4d09-adbc-b3fe6b739aa3',
    },
    tonoMuscularUuid: {
      _type: Type.ConceptUuid,
      _description: 'Tono muscular',
      _default: '0d73ab1a-faee-4774-b570-609d98d8f6e0',
    },
    buenTonoMuscularUuid: {
      _type: Type.ConceptUuid,
      _description: 'Buen tono muscular',
      _default: '7d3f083e-2de8-4e7b-b7e4-f81a97caa469',
    },

    // Reflexes
    reflejoDeSucciNUuid: {
      _type: Type.ConceptUuid,
      _description: 'Reflejo de Succión',
      _default: 'b76fe27e-4ca3-426a-bfb2-e7a49569c713',
    },
    reflejoDeDegluciNUuid: {
      _type: Type.ConceptUuid,
      _description: 'Reflejo de Deglución',
      _default: '2e60bebc-8be0-4108-978e-fe11cff9dd04',
    },
    reflejoDeBSquedaUuid: {
      _type: Type.ConceptUuid,
      _description: 'Reflejo de Búsqueda',
      _default: 'd6838254-89e6-43db-a8ee-e4e49f36047e',
    },
    reflejoDePresiNPlantarUuid: {
      _type: Type.ConceptUuid,
      _description: 'Reflejo de Presión Plantar',
      _default: '471bcb1a-088a-49b9-a896-e1a7f486e0c5',
    },
    reflejoDeMarchaAutomTicaUuid: {
      _type: Type.ConceptUuid,
      _description: 'Reflejo de Marcha Automática',
      _default: 'e6d349d2-fad5-4322-9c09-ec612cf1fdd9',
    },
    reflejoMoroUuid: {
      _type: Type.ConceptUuid,
      _description: 'Reflejo Moro',
      _default: 'dc1d326f-d116-4b35-ba56-f99a981097d9',
    },

    // Physical Characteristics
    colorDePielUuid: {
      _type: Type.ConceptUuid,
      _description: 'Color de Piel',
      _default: 'c00971b1-029f-4160-9b68-55e101a512a8',
    },
    pinkUuid: {
      _type: Type.ConceptUuid,
      _description: 'Pink',
      _default: 'bfef8539-e00b-4c81-b3c8-79af87562e24',
    },
    pLidoUuid: {
      _type: Type.ConceptUuid,
      _description: 'Pálido',
      _default: 'f2eae333-7cbf-434c-a8e9-d4ec0126d161',
    },
    cianTicoUuid: {
      _type: Type.ConceptUuid,
      _description: 'Cianótico',
      _default: 'dacb38a4-3a5a-4943-8618-396bfb4f4a1f',
    },

    // Anatomical Assessment
    bocaUuid: {
      _type: Type.ConceptUuid,
      _description: 'Boca',
      _default: '1a512c73-916f-4df3-938d-6f2c3d705fc3',
    },
    noseUuid: {
      _type: Type.ConceptUuid,
      _description: 'Nose',
      _default: '313226d7-d67d-4246-8d84-62f7208badf5',
    },
    orejasUuid: {
      _type: Type.ConceptUuid,
      _description: 'Orejas',
      _default: '4b4f8ad4-a934-4ead-921a-266ca1d2102c',
    },
    cuelloUuid: {
      _type: Type.ConceptUuid,
      _description: 'Cuello',
      _default: '7978016d-a854-427b-8451-9f6ca62b5186',
    },
    extremidadesUuid: {
      _type: Type.ConceptUuid,
      _description: 'Extremidades',
      _default: '46dc8706-c1af-4b04-b5d8-7432de862fef',
    },
    caderaUuid: {
      _type: Type.ConceptUuid,
      _description: 'Cadera',
      _default: 'ca9f422f-f103-43c4-ae56-1b43bc2e7ec1',
    },

    // Additional Assessment Concepts
    kawaidaUuid: {
      _type: Type.ConceptUuid,
      _description: 'Kawaida',
      _default: 'f35aa4ba-9d04-4283-a4c8-ec8f2ee29da5',
    },
    mamilasUuid: {
      _type: Type.ConceptUuid,
      _description: 'Mamilas',
      _default: '36094aaf-31f7-46e8-92f1-8e8f7b7181ec',
    },
    softAbdomenUuid: {
      _type: Type.ConceptUuid,
      _description: 'Soft abdomen',
      _default: '7160ba29-8f60-440e-aad5-8bec6ab862c1',
    },
    columnaVertebralUuid: {
      _type: Type.ConceptUuid,
      _description: 'Columna vertebral',
      _default: 'd5d244f7-911b-43ca-90a1-3001c167b342',
    },

    // Additional concepts continue with same pattern...
    // (Truncated for brevity - the remaining CRED concepts would follow the same organization)
  },

  // 10. AGE GROUPS CONFIGURATION
  ageGroupsCRED: {
    _type: Type.Array,
    _description: 'Configuración de grupos etarios para CRED',
    _default: [
      { label: 'RECIÉN NACIDO', sublabel: '0 A 29 DÍAS', minDays: 0, maxDays: 29 },
      { label: '0 AÑOS', sublabel: '1 A 11 MESES', minMonths: 1, maxMonths: 11 },
      { label: '1 AÑO', sublabel: '12 A 23 MESES', minMonths: 12, maxMonths: 23 },
      { label: '2 AÑOS', sublabel: '24 A 35 MESES', minMonths: 24, maxMonths: 35 },
      { label: '3 AÑOS', sublabel: '36 A 47 MESES', minMonths: 36, maxMonths: 47 },
      { label: '4 AÑOS', sublabel: '48 A 59 MESES', minMonths: 48, maxMonths: 59 },
      { label: '5 AÑOS', minMonths: 60, maxMonths: 71 },
      { label: '6 AÑOS', minMonths: 72, maxMonths: 83 },
      { label: '7 AÑOS', minMonths: 84, maxMonths: 95 },
      { label: '8 AÑOS', minMonths: 96, maxMonths: 107 },
      { label: '9 AÑOS', minMonths: 108, maxMonths: 119 },
      { label: '10 AÑOS', minMonths: 120, maxMonths: 131 },
      { label: '11 AÑOS', minMonths: 132, maxMonths: 143 },
    ],
    _elements: {
      _type: Type.Object,
      label: { _type: Type.String },
      sublabel: { _type: Type.String, _optional: true },
      minDays: { _type: Type.Number, _optional: true },
      maxDays: { _type: Type.Number, _optional: true },
      minMonths: { _type: Type.Number, _optional: true },
      maxMonths: { _type: Type.Number, _optional: true },
    },
  },

  // 11. RELATIONSHIPS CONFIGURATION
  familyRelationshipsTypeList: {
    _type: Type.Array,
    _description: 'Lista de relaciones familiares (used to list contacts)',
    _default: [
      { uuid: '8d91a210-c2cc-11de-8d13-0010c6dffdff', display: 'Madre' },
      { uuid: '8d91a210-c2cc-11de-8d13-0010c6dffd0f', display: 'Padre' },
      { uuid: '8d91a01c-c2cc-11de-8d13-0010c6dffd0f', display: 'Hermano' },
      { uuid: '5c2f978d-3b7d-493c-9e8f-cb3d1c0b6a55', display: 'Abuelo' },
      { uuid: '8d91a3dc-c2cc-11de-8d13-0010c6dffd0f', display: 'Tío' },
      { uuid: '8d91a3dc-c2cc-11de-8d13-0010c6dffd00', display: 'Sobrino' },
    ],
  },

  pnsRelationships: {
    _type: Type.Array,
    _description: 'List of Partner relationships (PNS - Partner Notification Service)',
    _default: [
      { uuid: '6b1c5e8f-32f7-41b3-bc2a-8b3e97a6d937', display: 'Esposo', sexual: true },
      { uuid: '1e3f4a5b-6789-4cde-9101-abcdef123457', display: 'Pareja', sexual: true },
      { uuid: 'a2b5c9f8-0d2a-4bdf-8d9b-6f3b2d1e5a2f', display: 'Otro' }, //change for otro tipo de contacto sexual
    ],
  },

  otherRelationships: {
    _type: Type.Array,
    _description: 'List of other relationships',
    _default: [
      { uuid: '', display: 'Tutor' },
      { uuid: '057de23f-3d9c-4314-9391-4452970739c6', display: 'Apoderado' },
      { uuid: 'a2b5c9f8-0d2a-4bdf-8d9b-6f3b2d1e5a2f', display: 'Otro' },
    ],
  },

  // 12. SYSTEM IDENTIFIERS
  defaulterTracingEncounterUuid: {
    _type: Type.String,
    _description: 'Encounter UUID for defaulter tracing',
    _default: '1495edf8-2df2-11e9-b210-d663bd873d93',
  },

  clinicalEncounterUuid: {
    _type: Type.String,
    _description: 'Clinical Encounter UUID',
    _default: '465a92f2-baf8-42e9-9612-53064be868e8',
  },

  registrationEncounterUuid: {
    _type: Type.String,
    _description: 'Registration encounter UUID',
    _default: 'de1f9d67-b73e-4e1b-90d0-036166fc6995',
  },

  defaultIDUuid: {
    _type: Type.String,
    _description: 'HSC Identifier UUID',
    _default: '05a29f94-c0ed-11e2-94be-8c13b969e334',
  },

  defaultIdentifierSourceUuid: {
    _type: Type.String,
    _description: 'IdGen de Identificador HSC',
    _default: '8549f706-7e85-4c1d-9424-217d50a2988b',
  },

  maritalStatusUuid: {
    _type: Type.String,
    _description: 'Marital status concept UUID',
    _default: 'aa345a81-3811-4e9c-be18-d6be727623e0',
  },

  hivProgramUuid: {
    _type: Type.String,
    _description: 'HIV Program UUID',
    _default: 'dfdc6d40-2f2f-463d-ba90-cc97350441a8',
  },

  // 13. CONTACT ATTRIBUTES
  contactPersonAttributesUuid: {
    _type: Type.Object,
    _description: 'Contact created patient attributes UUID',
    _default: {
      telephone: 'b2c38640-2603-4629-aebd-3b54f33f1e3a',
      baselineHIVStatus: '3ca03c84-632d-4e53-95ad-91f1bd9d96d6',
      contactCreated: '7c94bd35-fba7-4ef7-96f5-29c89a318fcf',
      preferedPnsAproach: '59d1b886-90c8-4f7f-9212-08b20a9ee8cf',
      livingWithContact: '35a08d84-9f80-4991-92b4-c4ae5903536e',
      contactipvOutcome: '49c543c2-a72a-4b0a-8cca-39c375c0726f',
    },
  },

  // 14. REGISTRATION CONFIGURATION
  registrationObs: {
    encounterTypeUuid: {
      _type: Type.UUID,
      _default: null,
      _description: 'Obs created during registration will be associated with an encounter of this type.',
    },
    encounterProviderRoleUuid: {
      _type: Type.UUID,
      _default: 'a0b03050-c99b-11e0-9572-0800200c9a66',
      _description: "Provider role to use for the registration encounter. Default is 'Unknown'.",
    },
    registrationFormUuid: {
      _type: Type.UUID,
      _default: null,
      _description: 'Form UUID to associate with the registration encounter.',
    },
  },

  // 15. LEGEND CONFIGURATION
  legend: {
    _type: Type.Object,
    _description: 'Configuration for legend display in UI components',
    colorDefinitions: {
      _type: Type.Array,
      _description: 'Array of concept UUIDs and their associated colors',
      _default: [
        {
          conceptUuid: 'example-uuid-1',
          colour: '#FF0000',
        },
        {
          conceptUuid: 'example-uuid-2',
          colour: '#00FF00',
        },
      ],
      _elements: {
        _type: Type.Object,
        conceptUuid: {
          _type: Type.ConceptUuid,
          _description: 'UUID of the concept to associate with a color',
        },
        colour: {
          _type: Type.String,
          _description: 'CSS color value (e.g., hex, RGB, color name)',
        },
      },
    },
    legendConceptSet: {
      _type: Type.ConceptUuid,
      _description: 'UUID of the concept set used for legend items',
      _default: 'example-concept-set-uuid',
    },
  },

  // 16. DYAKU FHIR CONFIGURATION
  dyaku: {
    _type: Type.Object,
    _description: 'Configuración para conectar con el sistema FHIR Dyaku del MINSA',
    _default: {
      fhirBaseUrl: 'https://dyaku.minsa.gob.pe/fhir',
      syncEnabled: true,
      syncBatchSize: 50,
      syncIntervalMinutes: 30,
      identifierSourceUuid: '8549f706-7e85-4c1d-9424-217d50a2988b',
      dniIdentifierTypeUuid: '550e8400-e29b-41d4-a716-446655440001',
    },
    fhirBaseUrl: {
      _type: Type.String,
      _description: 'URL base del servidor FHIR de Dyaku',
      _default: 'https://dyaku.minsa.gob.pe/fhir',
    },
    syncEnabled: {
      _type: Type.Boolean,
      _description: 'Habilitar sincronización automática de pacientes desde Dyaku',
      _default: true,
    },
    syncBatchSize: {
      _type: Type.Number,
      _description: 'Número de pacientes a sincronizar por lote',
      _default: 50,
    },
    syncIntervalMinutes: {
      _type: Type.Number,
      _description: 'Intervalo en minutos para sincronización automática',
      _default: 30,
    },
    identifierSourceUuid: {
      _type: Type.String,
      _description: 'UUID del IdGen source para generar identificadores automáticos',
      _default: '8549f706-7e85-4c1d-9424-217d50a2988b',
    },
    dniIdentifierTypeUuid: {
      _type: Type.String,
      _description: 'UUID del tipo de identificador para DNI peruano',
      _default: '550e8400-e29b-41d4-a716-446655440001',
    },
  },

  // 17. CRED FORMS BY AGE GROUP CONFIGURATION
  CREDFormsByAgeGroup: {
    _type: Type.Array,
    _description: 'Configuración de formularios CRED por grupo etario',
    _default: [
      {
        label: 'RECIÉN NACIDO',
        minMonths: 0,
        maxMonths: 0.93,
        forms: ['atencionImmediataNewborn', 'newbornNeuroEval', 'breastfeedingObservation', 'roomingIn'],
      },
      {
        label: '2 MESES',
        minMonths: 1,
        maxMonths: 2.5,
        forms: ['eedp2Months', 'nursingAssessment', 'childFeeding0to5', 'riskInterview0to30'],
      },
      {
        label: '4 MESES',
        minMonths: 2.5,
        maxMonths: 5,
        forms: ['eedp5Months', 'nursingAssessment', 'childFeeding0to5', 'riskInterview0to30'],
      },
      {
        label: '6 MESES',
        minMonths: 5,
        maxMonths: 8,
        forms: ['eedp5Months', 'nursingAssessment', 'childFeeding6to42', 'riskInterview0to30'],
      },
      {
        label: '9 MESES',
        minMonths: 8,
        maxMonths: 11,
        forms: ['eedp8Months', 'nursingAssessment', 'childFeeding6to42', 'riskInterview0to30'],
      },
      {
        label: '12 MESES',
        minMonths: 11,
        maxMonths: 15,
        forms: ['eedp12Months', 'nursingAssessment', 'childFeeding6to42', 'riskInterview0to30', 'childAbuseScreening'],
      },
      {
        label: '15 MESES',
        minMonths: 15,
        maxMonths: 18,
        forms: ['eedp15Months', 'nursingAssessment', 'childFeeding6to42', 'childAbuseScreening'],
      },
      {
        label: '18 MESES',
        minMonths: 18,
        maxMonths: 24,
        forms: ['eedp18Months', 'nursingAssessment', 'childFeeding6to42', 'childAbuseScreening'],
      },
      {
        label: '2 AÑOS',
        minMonths: 24,
        maxMonths: 30,
        forms: ['eedp21Months', 'nursingAssessment', 'childFeeding6to42', 'childAbuseScreening'],
      },
      {
        label: '30 MESES',
        minMonths: 30,
        maxMonths: 36,
        forms: ['tepsi', 'nursingAssessment', 'childFeeding6to42', 'childAbuseScreening'],
      },
      {
        label: '3 AÑOS',
        minMonths: 36,
        maxMonths: 48,
        forms: ['tepsi', 'nursingAssessment', 'childAbuseScreening'],
      },
      {
        label: '4 AÑOS',
        minMonths: 48,
        maxMonths: 60,
        forms: ['tepsi', 'nursingAssessment', 'childAbuseScreening'],
      },
      {
        label: '5 AÑOS',
        minMonths: 60,
        maxMonths: 120,
        forms: ['tepsi', 'nursingAssessment', 'childAbuseScreening'],
      },
    ],
    _elements: {
      _type: Type.Object,
      label: { _type: Type.String },
      minMonths: { _type: Type.Number },
      maxMonths: { _type: Type.Number },
      forms: { _type: Type.Array, _elements: { _type: Type.String } },
    },
  },
};

// ===============================
// TYPE INTERFACES
// ===============================

export interface BiometricsConfigObject {
  bmiUnit: string;
  heightUnit: string;
  weightUnit: string;
}

export interface LegendConfigObject {
  legendConceptSet: string;
  colorDefinitions: Array<{
    conceptUuid: string;
    colour: string;
  }>;
}

export interface PartographyConfigObject {
  concepts: {
    obsDateUiid: string;
    timeRecordedUuid: string;
    fetalHeartRateUuid: string;
    cervicalDilationUiid: string;
    descentOfHead: string;
  };
}

export interface PartograpyComponents {
  id: string;
  date: string;
  fetalHeartRate: number;
  cervicalDilation: number;
  descentOfHead: string;
}

export interface AgeRange {
  label: string;
  sublabel?: string;
  minDays?: number;
  maxDays?: number;
  minMonths?: number;
  maxMonths?: number;
}

export interface ConfigObject {
  conditionPageSize: number;
  conditionConceptClassUuid: string;
  conditionConceptSets: {
    antecedentesPatologicos: {
      uuid: string;
      title: string;
      description: string;
    };
  };
  encounterTypes: {
    alojamientoConjunto: string;
    specializedConsultation: string;
    triage: string;
    deliveryRoomCare: string;
    hivTestingServices: string;
    prenatalControl: string;
    postnatalControl: string;
    healthyChildControl: string;
    dentalCare: string;
    malnutritionAnemiaCare: string;
    obstetricUltrasound: string;
    externalConsultation: string;
    hospitalization: string;
    hospitalDischarge: string;
    emergencyCare: string;
    chronicDiseaseFollowup: string;
    mentalHealthEvaluation: string;
    medicationPrescriptionDispensation: string;
    antecedentesPerinatales: string;
    labResults: string;
    vaccinationAdministration: string;
    healthEducationCounseling: string;
    consultation: string;
    referralCounterReferral: string;
    intraHospitalTransfer: string;
    bedAssignment: string;
    hospitalizationProgressNote: string;
    transferRequest: string;
    encounterCancellation: string;
    clinicalFileUpload: string;
    atencionInmediata: string;
    tbTreatmentSupervision: string;
    covid19Management: string;
    electiveAmbulatorySurgery: string;
    order: string;
    cefaloCaudal: string;
    consejeriaMaterna: string;
  };
  vitals: {
    useFormEngine: boolean;
    encounterTypeUuid: string;
    formUuid: string;
    formName: string;
    useMuacColors: boolean;
    showPrintButton: boolean;
  };
  biometrics: BiometricsConfigObject;
  madreGestante: Record<string, string>;
  CRED: Record<string, string>;
  caseManagementForms: Array<{
    id: string;
    title: string;
    formUuid: string;
    encounterTypeUuid: string;
  }>;
  formsList: {
    prenatal: string;
    postnatal: string;
    labourAndDelivery: string;
    atencionPrenatal: string;
    atencionImmediataNewborn: string;
    maternalHistory: string;
    deliveryOrAbortion: string;
    SummaryOfLaborAndPostpartum: string;
    currentPregnancy: string;
    prenatalCare: string;
    immediatePostpartumPeriod: string;
    postpartumControl: string;
    defaulterTracingFormUuid: string;
    htsScreening: string;
    htsInitialTest: string;
    htsRetest: string;
    clinicalEncounterFormUuid: string;
    breastfeedingObservation: string;
    eedp12Months: string;
    tepsi: string;
    medicalProgressNote: string;
    eedp5Months: string;
    eedp21Months: string;
    nursingAssessment: string;
    medicalOrders: string;
    newbornNeuroEval: string;
    eedp15Months: string;
    riskInterview0to30: string;
    eedp8Months: string;
    roomingIn: string;
    eedp18Months: string;
    eedp2Months: string;
    childFeeding6to42: string;
    childAbuseScreening: string;
    epicrisis: string;
    childFeeding0to5: string;
    birthDetails: string;
    pregnancyDetails: string;
    puerperiumLab: string;
    obstetricMonitor: string;
    obstetricHistory: string;
    obstetricProgress: string;
    obstetricAntecedents: string;
    medicalProgress: string;
    nursingNotes: string;
    therapeuticSheet: string;
    birthPlanForm: string;
    vitalSignsControl: string;
    birthSummary: string;
    puerperiumEpicrisis: string;
    puerperiumDischarge: string;
    clinicalHistory: string;
  };
  defaulterTracingEncounterUuid: string;
  clinicalEncounterUuid: string;
  concepts: Record<string, string>;
  specialClinics: Array<{
    id: string;
    formUuid: string;
    encounterTypeUuid: string;
    title: string;
  }>;
  registrationEncounterUuid: string;
  registrationObs: {
    encounterTypeUuid: string | null;
    encounterProviderRoleUuid: string;
    registrationFormUuid: string | null;
  };
  defaultIDUuid: string;
  maritalStatusUuid: string;
  defaultIdentifierSourceUuid: string;
  legend: LegendConfigObject;
  hivProgramUuid: string;
  partography: PartographyConfigObject;
  contactPersonAttributesUuid: {
    telephone: string;
    baselineHIVStatus: string;
    contactCreated: string;
    preferedPnsAproach: string;
    livingWithContact: string;
    contactipvOutcome: string;
  };
  familyRelationshipsTypeList: Array<{
    uuid: string;
    display: string;
  }>;
  CREDFormsByAgeGroup;
  pnsRelationships: Array<{
    uuid: string;
    display: string;
    sexual: boolean;
  }>;
  otherRelationships: Array<{
    uuid: string;
    display: string;
  }>;
  ageGroupsCRED: AgeRange[];
  dyaku: {
    fhirBaseUrl: string;
    syncEnabled: boolean;
    syncBatchSize: number;
    syncIntervalMinutes: number;
    identifierSourceUuid: string;
    dniIdentifierTypeUuid: string;
  };
}
