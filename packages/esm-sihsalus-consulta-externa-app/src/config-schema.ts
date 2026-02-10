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
  // Fallback concept for free-text antecedents
  conditionFreeTextFallbackConceptUuid: {
    _type: Type.ConceptUuid,
    _description:
      'Concept UUID used when saving free-text antecedents (Otros). This should be a generic "Antecedente" concept.',
    _default: '162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  },
  // 1. ENCOUNTER TYPES
  encounterTypes: {
    _type: Type.Object,
    _description: 'List of encounter type UUIDs',
    _default: {
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

      // Consulta Externa Forms
      consultaExternaForm: 'CE-001-CONSULTA EXTERNA',

      // Hospital Forms
      medicalProgress: 'HOSP-004-EVOLUCIÓN MÉDICA',
      nursingNotes: 'HOSP-009-NOTAS DE ENFERMERÍA',
      therapeuticSheet: 'HOSP-008-HOJA TERAPÉUTICA',
      vitalSignsControl: 'HOSP-001-CONTROL DE FUNCIONES VITALES',
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

    // Anthropometric Measurements
    heightUuid: {
      _type: Type.ConceptUuid,
      _description: 'Height or length measurement of the patient',
      _default: '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // Chief Complaint (CE-3)
    chiefComplaintUuid: {
      _type: Type.ConceptUuid,
      _description: 'Chief complaint / reason for visit (CIEL 5219)',
      _default: '5219AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // SOAP Notes (CE-5)
    soapSubjectiveUuid: {
      _type: Type.ConceptUuid,
      _description: 'SOAP Subjective concept (CIEL 160531)',
      _default: '160531AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    soapObjectiveUuid: {
      _type: Type.ConceptUuid,
      _description: 'SOAP Objective concept (CIEL 160532)',
      _default: '160532AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    soapAssessmentUuid: {
      _type: Type.ConceptUuid,
      _description: 'SOAP Assessment concept (CIEL 160533)',
      _default: '160533AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    soapPlanUuid: {
      _type: Type.ConceptUuid,
      _description: 'SOAP Plan concept (CIEL 159615)',
      _default: '159615AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // Insurance Provider (CE-6)
    insuranceProviderUuid: {
      _type: Type.ConceptUuid,
      _description: 'Insurance/payer type concept (SIS, EsSalud, Privado, Particular)',
      _default: '161631AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // Diagnosis Occurrence (CE-2)
    diagnosisOccurrenceUuid: {
      _type: Type.ConceptUuid,
      _description: 'Diagnosis occurrence: New vs Repeat',
      _default: '159946AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },

    // Treatment Plan (CE-4)
    labOrdersUuid: {
      _type: Type.ConceptUuid,
      _description: 'Lab orders / auxiliary exams concept',
      _default: '1271AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    proceduresUuid: {
      _type: Type.ConceptUuid,
      _description: 'Procedures performed concept (CPMS)',
      _default: '1651AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    prescriptionsUuid: {
      _type: Type.ConceptUuid,
      _description: 'Prescriptions / medication orders concept',
      _default: '1282AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    therapeuticIndicationsUuid: {
      _type: Type.ConceptUuid,
      _description: 'Therapeutic indications free-text concept',
      _default: '162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    referralUuid: {
      _type: Type.ConceptUuid,
      _description: 'Referral / interconsultation concept',
      _default: '1272AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
    nextAppointmentUuid: {
      _type: Type.ConceptUuid,
      _description: 'Next appointment date concept',
      _default: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
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
  conditionFreeTextFallbackConceptUuid: string;
  encounterTypes: {
    externalConsultation: string;
    specializedConsultation: string;
    triage: string;
    emergencyCare: string;
    hospitalization: string;
    hospitalDischarge: string;
    bedAssignment: string;
    intraHospitalTransfer: string;
    hospitalizationProgressNote: string;
    dentalCare: string;
    mentalHealthEvaluation: string;
    malnutritionAnemiaCare: string;
    chronicDiseaseFollowup: string;
    hivTestingServices: string;
    tbTreatmentSupervision: string;
    covid19Management: string;
    medicationPrescriptionDispensation: string;
    labResults: string;
    electiveAmbulatorySurgery: string;
    consultation: string;
    referralCounterReferral: string;
    transferRequest: string;
    encounterCancellation: string;
    healthEducationCounseling: string;
    clinicalFileUpload: string;
    order: string;
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
  caseManagementForms: Array<{
    id: string;
    title: string;
    formUuid: string;
    encounterTypeUuid: string;
  }>;
  formsList: {
    // Clinical Forms
    nursingAssessment: string;
    medicalOrders: string;
    medicalProgressNote: string;
    epicrisis: string;
    clinicalEncounterFormUuid: string;
    // Consulta Externa Forms
    consultaExternaForm: string;
    // HIV/HTS Forms
    defaulterTracingFormUuid: string;
    htsScreening: string;
    htsInitialTest: string;
    htsRetest: string;
    // Hospital Forms
    medicalProgress: string;
    nursingNotes: string;
    therapeuticSheet: string;
    vitalSignsControl: string;
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
  pnsRelationships: Array<{
    uuid: string;
    display: string;
    sexual: boolean;
  }>;
  otherRelationships: Array<{
    uuid: string;
    display: string;
  }>;
}
