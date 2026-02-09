# Plan Integral: Corrección y Optimización del Sistema CRED y Madre Gestante

## Alineado a Normativa Peruana Vigente (MINSA)

**Fecha:** 2026-02-09
**Versión:** 2.0 (actualizado con avance Fase 1)
**Paquetes afectados:**
- `esm-maternal-and-child-health` (v1.1.0)
- `esm-sihsalus-widgets-app` (v1.1.0)
- `esm-patient-immunizations-app`
- `sihsalus-content-referenceapplication` (formularios Ampath)

---

## I. ANÁLISIS DEL ESTADO ACTUAL

### A. Lo que ESTÁ implementado

#### Madre Gestante (Prenatal/Parto/Puerperio)
| Funcionalidad | Estado | Ubicación |
|---|---|---|
| Dashboard Prenatal (tabs: historia, embarazo actual, atención prenatal) | ✅ Completo | `maternal-and-child-health/components/prenatal-care/` |
| Historia Obstétrica (tabla + gráfico GTPAL) | ✅ Completo | `ui/obstetric-history-widget/` |
| Embarazo Actual (tabla de observaciones) | ✅ Completo | `prenatal-care/currentPregnancy.component.tsx` |
| Altura Uterina por semana gestacional | ✅ Completo | `ui/alturaCuello-chart/` |
| Dashboard Atención del Parto | ✅ Completo | `maternal-and-child-health/components/labour-delivery/` |
| Partograma (con contracciones: frecuencia + duración) | ✅ Completo | `ui/partography/` |
| Parto/Aborto (tabla) | ✅ Completo | `labour-delivery/deliveryOrAbortion.component.tsx` |
| Resumen Trabajo de Parto y Postparto | ✅ Completo | `labour-delivery/summaryOfLaborAndPostpartum.component.tsx` |
| Dashboard Puerperio | ✅ Completo | `maternal-and-child-health/components/postnatal-care/` |
| Puerperio Inmediato | ✅ Completo | `postnatal-care/immediatePostpartum.component.tsx` |
| Control Postparto (tabla + tracking puerperal) | ✅ Completo | `postnatal-care/postpartumControl.component.tsx` |
| Carnet Perinatal (workspace) | ✅ Completo | `workspaces/perinatal-register-form` |
| Visibilidad condicional (solo mujeres enroladas) | ✅ Completo | `showWhenExpression` en dashboard.meta |
| Navegación patient-chart (sidebar + routing) | ✅ Completo | Hidden route markers en `patient-chart-dashboard-slot` |
| usePatient fallback en todos los dashboards | ✅ Completo | Todos los componentes de dashboard |

#### CRED (Control de Crecimiento y Desarrollo)
| Funcionalidad | Estado | Ubicación |
|---|---|---|
| Dashboard Control de Niño Sano (tabs: Seguimiento, Controles, Desarrollo, Servicios) | ✅ Completo | `well-child-care/well-child-control.component.tsx` |
| Timeline CRED por grupo etario | ✅ Completo | `cred-controls-timeline/` |
| Matriz de seguimiento CRED | ✅ Completo | `cred-matrix.component.tsx` |
| Formularios CRED por edad (config) | ✅ Completo | `config-schema.ts → CREDFormsByAgeGroup` |
| Grupos etarios CRED (4 neonatales + 12 infantiles) | ✅ Completo | `config-schema.ts → ageGroupsCRED` |
| Dashboard Neonatal (6 tabs: vitales, perinatal, atención inmediata, céfalo-caudal, alojamiento, consejería) | ✅ Completo | `well-child-care/neonatal-care.component.tsx` |
| Atención Inmediata del RN | ✅ Completo | `neonatal-attention/` |
| Evaluación Céfalo-caudal y Neurológica | ✅ Completo | `neonatal-evaluation/` |
| Consejería Lactancia Materna | ✅ Completo | `neonatal-counseling/` |
| Alojamiento Conjunto | ✅ Completo | `neonatal-register/alojamiento-conjunto/` |
| Antropometría Neonatal (workspace) | ✅ Completo | `newborn-monitoring/newborn biometrics/` |
| Balance de Fluidos RN (workspace) | ✅ Completo | `newborn-monitoring/newborn balance/` |
| Detalles de Nacimiento | ✅ Completo | `neonatal-register/detalles-nacimiento/` |
| Esquema de Vacunación (2 tabs: esquema + reacciones) | ⚠️ Parcial | `vaccination-schema-widget/` — no alineado 100% a NTS 196 |
| EEDP (7 versiones por edad) | ✅ Config | Configurado en `CREDFormsByAgeGroup` |
| TEPSI (desde 24 meses) | ✅ Config | Configurado en `CREDFormsByAgeGroup` |
| Gráficos de Crecimiento (WHO) | ✅ Completo | `ui/growth-chart/` |
| Visibilidad condicional (enrolados en CRED) | ✅ Completo | `showWhenExpression` en dashboard.meta |

#### Compartido
| Funcionalidad | Estado | Ubicación |
|---|---|---|
| Encounter List genérico | ✅ Completo | `ui/encounter-list/` |
| Patient Summary Table | ✅ Completo | `ui/patient-summary-table/` |
| Tabbed Dashboard | ✅ Completo | `ui/tabbed-dashboard/` |
| Growth Chart (WHO standards) | ✅ Completo | `ui/growth-chart/` |
| Appointment Calendar | ✅ Completo | `ui/appointment-filter-calendar/` |
| Conditions/Antecedentes | ✅ Completo | `ui/conditions-filter/` |
| Forms Selector | ✅ Completo | `ui/forms-selector/` |

### B. Brechas Críticas — Estado de Avance

| # | Brecha | Estado | Normativa | Detalle |
|---|---|---|---|---|
| **B1** | Citas automáticas del Plan de Cuidado | ❌ Pendiente (Fase 2 — requiere OMOD) | NTS 137, NTS 105 | |
| **B2** | Tamizaje de Anemia | ✅ **Scaffold + hook + form Ampath** | NTS 137 | Hook `useAnemiaScreening`, componente scaffold, form `CRED-001-TAMIZAJE DE ANEMIA`, concept UUID `0ffe780c` |
| **B3** | Suplementación con Hierro/MMN | ✅ **Scaffold + hook + form Ampath** | Directiva 068 | Hook `useSupplementationTracker`, form `CRED-002-SUPLEMENTACIÓN NIÑO`, concept UUID `d80c3551` |
| **B4** | Plan de Parto | ✅ **Scaffold + hook + config** | NTS 105 | Hook `useBirthPlan`, form existente `OBST-004-FICHA PLAN DE PARTO`, indicator concept `47bb64cf` |
| **B5** | Psicoprofilaxis Obstétrica | ✅ **Scaffold + hook + form + encounter type** | RM 361-2011 | Hook `usePsychoprophylaxis`, form `OBST-012-PSICOPROFILAXIS`, encounter type `3cde4d44`, concept `400ebbfe` |
| **B6** | Tamizaje VIH/Sífilis/HepB | ✅ **Scaffold + hook + form Ampath** | NTS 159 | Hook `useScreeningIndicators`, form `OBST-013-TAMIZAJE PRENATAL`, concepts: VIH `afc399df`, sífilis `7218b021`, HepB `6d2eaa49` |
| **B7** | Clasificación de Riesgo Obstétrico | ⚠️ Hook scaffold (sin concepts en OCL) | NTS 105 | Hook `useObstetricRisk` existe; concepts de clasificación no encontrados en OCL |
| **B8** | Estimulación Temprana | ❌ Pendiente (Fase 2) | NTS 137 | |
| **B9** | Test Peruano de Desarrollo (TPED) | ❌ Pendiente (Fase 2) | NTS 137 | Tab "Desarrollo" creado con slot `cred-development-slot` |
| **B10** | Controles CRED del RN (4 controles) | ✅ **Completado** | NTS 137 | 4 subgrupos: RN-48h, RN-7d, RN-14d, RN-21d en `ageGroupsCRED` |
| **B11** | Suplementación gestante | ✅ **Scaffold + hook + form Ampath** | Directiva 069 | Hook `usePrenatalSupplementation`, form `OBST-011-SUPLEMENTACIÓN GESTANTE`, concepts: Fe `03a4f101`, Ác.Fólico `7418c3a3`, Calcio `15df7b2b` |
| **B12** | Partograma incompleto | ✅ **Completado** | NTS 105 | Columnas de frecuencia + duración de contracciones, tabs del gráfico |
| **B13** | Control puerperio tracking | ✅ **Scaffold** | NTS 105 | Componente `postpartum-tracking` registrado |
| **B14** | Esquema Vacunación NTS 196 | ❌ Pendiente (Fase 2) | NTS 196 | |

---

## II. ARQUITECTURA: SEPARACIÓN OMOD vs MICROFRONTEND

### Principio Fundamental

```
┌──────────────────────────────────────────────────────┐
│                   MICROFRONTEND (ESM)                 │
│  Solo: UI, Presentación, Navegación, Validación UI   │
│  NO: Lógica de negocio del servidor, cálculos clíni- │
│  cos, reglas de workflow, persistencia compleja       │
└──────────────────┬───────────────────────────────────┘
                   │ REST API / FHIR
┌──────────────────▼───────────────────────────────────┐
│                     OMOD (Backend)                    │
│  Sí: Lógica de negocio, Cálculos, Reglas de flujo,  │
│  Persistencia, Validación de datos, Triggers          │
└──────────────────────────────────────────────────────┘
```

### OMOD Existentes que se usan

| OMOD | Función | Usado por |
|---|---|---|
| `webservices.rest` | REST API genérica | Todo |
| `fhir2` | FHIR R4 API | Conditions, Immunizations |
| `appointments` | Gestión de citas | Calendar, CRED appointments |
| `formengine` | Motor de formularios | O3 Form Engine |
| `fua` (custom) | Gestión de FUA | esm-fua-app |

### OMOD Nuevos Requeridos (Fase 2)

| OMOD | Justificación | Funcionalidad |
|---|---|---|
| **omod-cred-care-plan** | Generar automáticamente las citas CRED según fecha de nacimiento y grupo etario (NTS 137). | POST `/ws/rest/v1/cred/careplan` → crea N appointments |
| **omod-prenatal-care-plan** | Generar citas prenatales según FUR y calcular edad gestacional. Incluir alertas de tamizaje. | POST `/ws/rest/v1/prenatal/careplan` → crea 6+ appointments |
| **omod-vaccination-schedule** | Generar calendario de vacunación individual según fecha de nacimiento alineado a NTS 196. | POST `/ws/rest/v1/vaccination/schedule` → crea plan individual |
| **omod-risk-classification** | Calcular clasificación de riesgo obstétrico basado en antecedentes y observaciones actuales. | GET `/ws/rest/v1/obstetric-risk/{patientUuid}` → score + clasificación |

---

## III. ESTADO DE IMPLEMENTACIÓN POR FASE

### FASE 1: Correcciones Frontend — AVANCE

| Item | Descripción | Estado | Detalles |
|---|---|---|---|
| F1.1 | Corregir Config Schema | ✅ Completado | Tipos corregidos, 10A-10E con UUIDs reales de OCL |
| F1.2 | Completar Partograma | ✅ Completado | Columnas frecuencia + duración contracciones, tabs del gráfico |
| F1.3 | Controles CRED del RN (4 controles) | ✅ Completado | RN-48h, RN-7d, RN-14d, RN-21d en `ageGroupsCRED` |
| F1.4 | Componente Tamizaje de Anemia | ✅ Scaffold + hook | Hook `useAnemiaScreening` con SWR real, componente registrado |
| F1.5 | Componente Suplementación MMN (niño) | ✅ Scaffold + hook | Hook `useSupplementationTracker`, componente registrado |
| F1.6 | Componente Plan de Parto | ✅ Scaffold + hook | Hook `useBirthPlan`, botón de lanzamiento Ampath form |
| F1.7 | Badge Riesgo Obstétrico | ⚠️ Hook scaffold | Hook `useObstetricRisk` (concepts no encontrados en OCL) |
| F1.8 | Indicadores Tamizaje VIH/Sífilis/HepB | ✅ Scaffold + hook | Hook `useScreeningIndicators` con SWR real |
| F1.9 | Suplementación Gestante | ✅ Scaffold + hook | Hook `usePrenatalSupplementation` con SWR real |
| F1.10 | Tracking Controles Puerperio | ✅ Scaffold | Componente `postpartum-tracking` registrado |
| F1.11 | Tracking Psicoprofilaxis | ✅ Scaffold + hook | Hook `usePsychoprophylaxis` con SWR real |

#### Infraestructura completada (Fase 1)

| Elemento | Estado | Detalle |
|---|---|---|
| Navegación sidebar (patient-chart) | ✅ | Slot cambiado a `patient-chart-dashboard-slot`, hidden route markers |
| usePatient fallback en 6 dashboards | ✅ | Prenatal, Parto, Puerperio, CRED, Neonatal, Vacunación |
| Tabs ajustados a normas peruanas | ✅ | CRED: eliminado tab vacío, agregado "Desarrollo"; Prenatal: renombrado "Atención Prenatal" |
| 7 hooks con SWR real | ✅ | useAnemiaScreening, useSupplementationTracker, useBirthPlan, useObstetricRisk, useScreeningIndicators, usePsychoprophylaxis, usePrenatalSupplementation |
| 7 componentes scaffold con SCSS | ✅ | Registrados en index.ts + routes.json |
| 6 secciones de config (10A-10F) | ✅ | UUIDs reales de OCL en 10A-10E; 10F pendiente (concepts no existen) |
| Traducciones completas (es + en) | ✅ | Todos los labels y mensajes nuevos |

### FASE 1 — Lo que falta por completar

| Pendiente | Prioridad | Detalles |
|---|---|---|
| Conectar hooks a componentes reales (no solo scaffold) | ALTA | Los componentes scaffold renderizan data de los hooks pero necesitan UI final |
| Crear concepts de Riesgo Obstétrico en OCL | MEDIA | classificationConceptUuid, highRiskConceptUuid, lowRiskConceptUuid |
| Validar forms Ampath contra servidor | ALTA | Verificar que los concept UUIDs de respuesta existen en el servidor |
| Registrar encounter type Psicoprofilaxis en servidor | ALTA | UUID `3cde4d44-72f8-4aeb-9025-7a8906a56ae8` (definido en encountertypes.csv del content repo) |

---

## IV. FORMULARIOS AMPATH CREADOS

### Repo: `sihsalus-content-referenceapplication`
**Ruta:** `configuration/backend_configuration/ampathforms/`

| Formulario | Norma | Encounter Type | Campos principales |
|---|---|---|---|
| `CRED-001-TAMIZAJE DE ANEMIA` | NTS 137 | Control de Niño Sano | Hemoglobina (g/dL), altitud, clasificación (Leve/Moderada/Severa), MMN entregados |
| `CRED-002-SUPLEMENTACIÓN NIÑO` | Directiva 068 | Control de Niño Sano | Tipo suplemento (MMN/Hierro), cantidad entregada, consejería nutricional |
| `OBST-011-SUPLEMENTACIÓN GESTANTE` | Directiva 069 / NTS 105 | Control Prenatal | EG, ácido fólico, fierro+ác.fólico, calcio, indicadores de adherencia (%) |
| `OBST-012-PSICOPROFILAXIS` | RM 361-2011 | Sesión de Psicoprofilaxis | EG, sesión (1-6), acompañante, observaciones |
| `OBST-013-TAMIZAJE PRENATAL` | NTS 159 | Control Prenatal | VIH (Reactivo/No Reactivo/No Determinado), Sífilis, HBsAg, Hemoglobina |

### Formularios existentes relevantes (ya en el repo)

| Formulario | Uso |
|---|---|
| `OBST-001-ANTECEDENTES` | Historia materna — antecedentes familiares, personales, obstétricos |
| `OBST-002-EMBARAZO ACTUAL` | Registro del embarazo actual |
| `OBST-003-ATENCIÓN PRENATAL` | Control prenatal — vitales, altura uterina, suplementación, evaluación fetal |
| `OBST-004-FICHA PLAN DE PARTO` (4 variantes) | Plan de parto — primera, segunda, tercera consulta |
| `OBST-005 a OBST-010` | Parto, puerperio, egreso, reingreso, control puerperio |

---

## V. CONCEPT UUIDs — DICCIONARIO OCL (PeruHCE/sihsalus)

### Concepts de pregunta (question concepts)

| Concepto | UUID | OCL ID | Tipo | Usado en |
|---|---|---|---|---|
| Hemoglobina | `0ffe780c-a3ee-4c9c-b4dd-bf2e0f79dc7f` | 655 | Test / Numeric (g/dL) | 10A, CRED-001, OBST-013 |
| Prueba rápida VIH | `afc399df-0376-4e3a-a8f5-cac6aa2d4bb9` | 330 | Test / Coded | 10D, OBST-013 |
| Prueba sífilis VDRL | `7218b021-712f-49d8-b733-76bf899c1bde` | 652 | Test / Coded | 10D, OBST-013 |
| Prueba rápida Ags HB | `6d2eaa49-ea92-4404-a5be-5f7081e6c6d5` | 4310 | Test / Coded | 10D, OBST-013 |
| Indicación Fierro/Ác. Fólico | `03a4f101-bf46-4923-97a1-759d926dee00` | 2112 | Drug / Numeric | 10B, OBST-011 |
| Indicación Ácido Fólico | `7418c3a3-4c2a-4943-91db-ae2b561d6ded` | 2114 | Drug / Numeric | 10B, OBST-011 |
| Indicación Calcio | `15df7b2b-ad43-410e-9edb-d1f40320faf4` | 2113 | Drug / Numeric | 10B, OBST-011 |
| Administración Micronutriente | `d80c3551-2a6c-49ac-a541-0b17957f9657` | 3162 | Misc | 10B, CRED-001, CRED-002 |
| Psicoprofilaxis | `400ebbfe-bdb6-42b8-a783-226e027e2e05` | 1598 | Procedure / Coded | 10E, OBST-012 |
| Plan de Parto indicador | `47bb64cf-f63c-46a0-839a-9573bcedf9be` | 1608 | Misc / Coded | 10C |
| Anemia (diagnóstico) | `82e4809f-801f-4fc8-8872-f180cf7fcb3c` | 472 | Diagnosis | CRED-001, OBST-013 |

### Concepts de respuesta (answer concepts)

| Concepto | UUID | OCL ID | Usado en |
|---|---|---|---|
| Reactivo | `0acdaa4a-b1ca-45ae-b4a5-82f82b3588b0` | 654 | OBST-013 (VIH, sífilis, HepB) |
| No reactivo | `24ee88ef-a6cf-4678-9322-78932f85b9bc` | 653 | OBST-013 |
| No determinado | `6b2f3df1-6b77-4b81-8acc-d0a88bcb7a04` | 303 | OBST-013 |
| Leve | `0c6478bd-ea06-40b2-a93f-a0a1f5c13b97` | 415 | CRED-001, OBST-013 (clasificación anemia) |
| Moderado | `aed747d5-fba0-49fc-9e29-ebc56b62fb22` | 413 | CRED-001, OBST-013 |
| Severo | `b1b29870-eccd-4821-847c-668df29b4ad4` | 414 | CRED-001, OBST-013 |
| Indicador Ác. Fólico | `c4a30e3e-c181-457c-8ee6-beccb955b985` | 1606 | OBST-011 (adherencia) |
| Indicador Fe/Ác. Fólico ≥16sem | `38192c90-b95b-4e68-b13d-28092566385e` | 1604 | OBST-011 (adherencia) |
| Indicador Calcio | `892b26bd-007b-41dd-b976-42ff06592011` | 1605 | OBST-011 (adherencia) |

### Concepts NO encontrados en OCL (pendiente crear)

| Concepto necesario | Sección | Notas |
|---|---|---|
| Clasificación de Riesgo Obstétrico | 10F | Solo existe "Riesgo Sanitario" general |
| Alto Riesgo (answer) | 10F | |
| Bajo Riesgo (answer) | 10F | |

---

## VI. ENCOUNTER TYPES

### Definidos en `sihsalus-content-referenceapplication/configuration/backend_configuration/encountertypes/encountertypes.csv`

| UUID | Nombre | Usado por |
|---|---|---|
| `58a87b85-cb6c-4a4c-bc5f-0a2d1e0ff8ba` | Control Prenatal | OBST-003, OBST-011, OBST-013, hooks prenatales |
| `3w4x5y6z-3234-5678-9101-abcdefghij23` | Control de Niño Sano | CRED-001, CRED-002, hooks CRED |
| `2v3w4x5y-2234-5678-9101-abcdefghij22` | Control Postnatal | Controles puerperio |
| `3cde4d44-72f8-4aeb-9025-7a8906a56ae8` | **Sesión de Psicoprofilaxis** (NUEVO) | OBST-012, hook usePsychoprophylaxis |
| `83c8d2d0-4758-43b5-bba7-04aac5c08a07` | Atención Inmediata del RN | Neonatal |
| `e0a6cba3-fa9c-4bf0-90b7-9d4d48401d1c` | Evaluación Cefalo Caudal | Neonatal |
| `f90ac51d-bc0b-4551-a6f2-358e1a47751f` | Consejería Lactancia Materna | Neonatal |
| `984baa36-ee50-4693-92dd-82145be4847e` | Alojamiento Conjunto | Neonatal |
| `29c02aff-9a93-46c9-bf6f-48b552fcb1fa` | Administración de Vacunas | Inmunizaciones |

---

## VII. CONFIG SCHEMA — ESTADO ACTUAL

### Secciones 10A-10F en `config-schema.ts`

```typescript
// 10A. TAMIZAJE DE ANEMIA (NTS 137) — ✅ Completo
anemiaScreening: {
  hemoglobinaConceptUuid: '0ffe780c-a3ee-4c9c-b4dd-bf2e0f79dc7f',  // OCL #655
  anemiaThreshold: 11.0,  // g/dL
}

// 10B. SUPLEMENTACIÓN (Directiva 068/069) — ✅ Completo
supplementation: {
  mmnConceptUuid: 'd80c3551-2a6c-49ac-a541-0b17957f9657',        // OCL #3162
  mmnTotalTarget: 360,
  ironConceptUuid: '03a4f101-bf46-4923-97a1-759d926dee00',        // OCL #2112
  folicAcidConceptUuid: '7418c3a3-4c2a-4943-91db-ae2b561d6ded',  // OCL #2114
  calciumConceptUuid: '15df7b2b-ad43-410e-9edb-d1f40320faf4',    // OCL #2113
}

// 10C. PLAN DE PARTO (NTS 105) — ✅ Completo
birthPlan: {
  encounterTypeUuid: '58a87b85-cb6c-4a4c-bc5f-0a2d1e0ff8ba',    // Control Prenatal
  formUuid: '',  // Se resuelve por nombre: 'OBST-004-FICHA PLAN DE PARTO'
  indicatorConceptUuid: '47bb64cf-f63c-46a0-839a-9573bcedf9be',  // OCL #1608
}

// 10D. TAMIZAJE PRENATAL (NTS 159) — ✅ Completo
prenatalScreening: {
  vihResultConceptUuid: 'afc399df-0376-4e3a-a8f5-cac6aa2d4bb9',         // OCL #330
  sifilisResultConceptUuid: '7218b021-712f-49d8-b733-76bf899c1bde',      // OCL #652
  hepatitisBResultConceptUuid: '6d2eaa49-ea92-4404-a5be-5f7081e6c6d5',  // OCL #4310
}

// 10E. PSICOPROFILAXIS (RM 361-2011) — ✅ Completo
psychoprophylaxis: {
  encounterTypeUuid: '3cde4d44-72f8-4aeb-9025-7a8906a56ae8',    // Sesión de Psicoprofilaxis
  conceptUuid: '400ebbfe-bdb6-42b8-a783-226e027e2e05',           // OCL #1598
  totalSessionsRequired: 6,
}

// 10F. RIESGO OBSTÉTRICO (NTS 105) — ❌ Pendiente (concepts no existen en OCL)
obstetricRisk: {
  classificationConceptUuid: '',
  highRiskConceptUuid: '',
  lowRiskConceptUuid: '',
}
```

---

## VIII. HOOKS IMPLEMENTADOS (7)

| Hook | Archivo | Tipo de dato | Endpoint |
|---|---|---|---|
| `useAnemiaScreening` | `src/hooks/useAnemiaScreening.ts` | Último valor Hb, fecha | GET `/obs?concept={hemoglobinaUuid}` |
| `useSupplementationTracker` | `src/hooks/useSupplementationTracker.ts` | Total MMN entregados | GET `/obs?concept={mmnUuid}` |
| `useBirthPlan` | `src/hooks/useBirthPlan.ts` | Estado del plan de parto | GET `/obs?concept={indicatorUuid}` |
| `useObstetricRisk` | `src/hooks/useObstetricRisk.ts` | Clasificación de riesgo | GET `/obs?concept={classificationUuid}` |
| `useScreeningIndicators` | `src/hooks/useScreeningIndicators.ts` | VIH, sífilis, HepB | GET `/obs?concept={vihUuid,sifilisUuid,hepBUuid}` |
| `usePsychoprophylaxis` | `src/hooks/usePsychoprophylaxis.ts` | Sesiones completadas | GET `/encounter?encounterType={psicoprofilaxisUuid}` |
| `usePrenatalSupplementation` | `src/hooks/usePrenatalSupplementation.ts` | Fe, Ác.Fólico, Calcio | GET `/obs?concept={ironUuid,folicAcidUuid,calciumUuid}` |

---

## IX. FASE 2: Funcionalidades que requieren OMOD nuevo

### F2.1 — Plan de Cuidado CRED (omod-cred-care-plan)

**Frontend:** Botón "Generar Plan CRED", calendario de citas, reagendar individual.
**Backend:** Recibe `patientUuid` + `birthDate`, calcula fechas según NTS 137, crea N appointments.
```
POST /ws/rest/v1/cred/careplan
Body: { patientUuid, birthDate }
Response: { appointments: [...] }
```

### F2.2 — Plan de Cuidado Prenatal (omod-prenatal-care-plan)

**Frontend:** Botón "Generar Plan Prenatal", calendario de 6+ APN con alertas de tamizaje.
**Backend:** Recibe `patientUuid` + `FUR`, calcula EG, fechas APN, alertas tamizaje.
```
POST /ws/rest/v1/prenatal/careplan
Body: { patientUuid, lastMenstrualPeriod }
Response: { appointments: [...], screeningAlerts: [...] }
```

### F2.3 — Calendario de Vacunación Individual (omod-vaccination-schedule)

**Frontend:** Calendario individual de vacunas, estado por vacuna (pendiente/aplicada/atrasada).
**Backend:** Calcula fechas según NTS 196, verifica inmunizaciones FHIR.
```
POST /ws/rest/v1/vaccination/schedule
Body: { patientUuid, birthDate }
Response: { vaccines: [{ name, dueDate, status, appliedDate? }] }
```

### F2.4 — Clasificación de Riesgo Obstétrico (omod-risk-classification)

**Frontend:** Badge de riesgo en header prenatal, detalle de factores.
**Backend:** Evalúa antecedentes y factores, calcula score y clasificación.
```
GET /ws/rest/v1/obstetric-risk/{patientUuid}
Response: { classification: "BAJO"|"ALTO", factors: [...], score: number }
```

---

## X. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación | Estado |
|---|---|---|---|---|
| Concepts/UUIDs no existen en servidor | Media | Bloquea hooks | ✅ Mitigado: UUIDs verificados en OCL, forms creados | Solo falta 10F |
| OMOD tarde en desarrollarse | Media | Retrasa Fase 3 | Frontend puede usar mocks y conectar después | |
| Formularios O3 no creados | Baja | Bloquea workspaces | ✅ Mitigado: 5 forms Ampath creados y pusheados | |
| Encounter types no registrados | Baja | Bloquea hooks | ✅ Mitigado: Psicoprofilaxis agregado a encountertypes.csv | |
| Performance con muchos widgets nuevos | Baja | UX degradada | Lazy loading agresivo (getAsyncLifecycle) | |

---

## XI. RESULTADOS ESPERADOS

### Cumplimiento Normativo

| Normativa | Estado Pre-Fase 1 | Estado Post-Fase 1 (actual) | Estado Objetivo (Fase 3) |
|---|---|---|---|
| NTS 137 (CRED) | 70% | **85%** | 95% |
| NTS 105 (Atención Materna) | 60% | **80%** | 90% |
| NTS 214 (Atención Neonatal) | 85% | **90%** | 95% |
| NTS 196 (Vacunación) | 50% | 50% | 90% |
| NTS 159 (VIH/Sífilis/HepB) | 30% | **70%** | 85% |
| Directiva 068 (Suplementación niño) | 0% | **60%** | 80% |
| Directiva 069 (Suplementación gestante) | 0% | **60%** | 80% |
| RM 361-2011 (Psicoprofilaxis) | 0% | **60%** | 80% |

### Siguiente paso inmediato

1. **Desplegar** el content repo al servidor para registrar encounter types y forms
2. **Conectar** los hooks a UIs finales (reemplazar scaffolds por componentes reales con tablas/cards Carbon)
3. **Crear** concepts faltantes en OCL para Riesgo Obstétrico (10F)
4. **Iniciar** Fase 2: desarrollo de OMODs
