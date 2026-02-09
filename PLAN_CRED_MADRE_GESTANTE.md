# Plan Integral: Corrección y Optimización del Sistema CRED y Madre Gestante

## Alineado a Normativa Peruana Vigente (MINSA)

**Fecha:** 2026-02-09
**Versión:** 1.0
**Paquetes afectados:**
- `esm-maternal-and-child-health` (v1.1.0)
- `esm-sihsalus-widgets-app` (v1.1.0)
- `esm-patient-immunizations-app`

---

## I. ANÁLISIS DEL ESTADO ACTUAL

### A. Lo que ESTÁ implementado

#### Madre Gestante (Prenatal/Parto/Puerperio)
| Funcionalidad | Estado | Ubicación |
|---|---|---|
| Dashboard Prenatal (tabs: historia, embarazo actual, gráficos) | ✅ Completo | `maternal-and-child-health/components/prenatal-care/` |
| Historia Obstétrica (tabla + gráfico GTPAL) | ✅ Completo | `ui/obstetric-history-widget/` |
| Embarazo Actual (tabla de observaciones) | ✅ Completo | `prenatal-care/currentPregnancy.component.tsx` |
| Altura Uterina por semana gestacional | ✅ Completo | `ui/alturaCuello-chart/` |
| Dashboard Atención del Parto | ✅ Completo | `maternal-and-child-health/components/labour-delivery/` |
| Partograma | ⚠️ Parcial | `ui/partography/` — falta frecuencia/duración contracciones |
| Parto/Aborto (tabla) | ✅ Completo | `labour-delivery/deliveryOrAbortion.component.tsx` |
| Resumen Trabajo de Parto y Postparto | ✅ Completo | `labour-delivery/summaryOfLaborAndPostpartum.component.tsx` |
| Dashboard Puerperio | ✅ Completo | `maternal-and-child-health/components/postnatal-care/` |
| Puerperio Inmediato | ✅ Completo | `postnatal-care/immediatePostpartum.component.tsx` |
| Control Postparto (tabla) | ✅ Completo | `postnatal-care/postpartumControl.component.tsx` |
| Carnet Perinatal (workspace) | ✅ Completo | `workspaces/perinatal-register-form` |
| Visibilidad condicional (solo mujeres enroladas) | ✅ Completo | `showWhenExpression` en dashboard.meta |

#### CRED (Control de Crecimiento y Desarrollo)
| Funcionalidad | Estado | Ubicación |
|---|---|---|
| Dashboard Control de Niño Sano (tabs) | ✅ Completo | `well-child-care/well-child-control.component.tsx` |
| Timeline CRED por grupo etario | ✅ Completo | `cred-controls-timeline/` |
| Matriz de seguimiento CRED | ✅ Completo | `cred-matrix.component.tsx` |
| Formularios CRED por edad (config) | ✅ Completo | `config-schema.ts → CREDFormsByAgeGroup` |
| Grupos etarios CRED (13 grupos) | ✅ Completo | `config-schema.ts → ageGroupsCRED` |
| Dashboard Neonatal (vitales, perinatal, evaluación) | ✅ Completo | `well-child-care/neonatal-care.component.tsx` |
| Atención Inmediata del RN | ✅ Completo | `neonatal-attention/` |
| Evaluación Céfalo-caudal y Neurológica | ✅ Completo | `neonatal-evaluation/` |
| Consejería Lactancia Materna | ✅ Completo | `neonatal-counseling/` |
| Alojamiento Conjunto | ✅ Completo | `neonatal-register/alojamiento-conjunto/` |
| Antropometría Neonatal (workspace) | ✅ Completo | `newborn-monitoring/newborn biometrics/` |
| Balance de Fluidos RN (workspace) | ✅ Completo | `newborn-monitoring/newborn balance/` |
| Detalles de Nacimiento | ✅ Completo | `neonatal-register/detalles-nacimiento/` |
| Esquema de Vacunación | ⚠️ Parcial | `vaccination-schema-widget/` — no alineado 100% a NTS 196 |
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

### B. Lo que FALTA (Brechas Críticas)

| # | Brecha | Impacto | Normativa |
|---|---|---|---|
| **B1** | **Citas automáticas del Plan de Cuidado** (CRED + Prenatal + Vacunación) | CRÍTICO | NTS 137, NTS 105 |
| **B2** | **Tamizaje de Anemia** (dosaje Hb a los 6m, luego semestral) | ALTO | NTS 137 (mod. RM 643-2018) |
| **B3** | **Suplementación con Hierro/MMN** (tracking 360 sobres) | ALTO | Directiva 068 |
| **B4** | **Plan de Parto** (instrumento obligatorio desde 2do trimestre) | ALTO | NTS 105 |
| **B5** | **Psicoprofilaxis Obstétrica** (tracking 6 sesiones) | MEDIO | RM 361-2011 |
| **B6** | **Tamizaje VIH/Sífilis/HepB** (1ra APN + semanas 28, 32) | ALTO | NTS 159 |
| **B7** | **Clasificación de Riesgo Obstétrico** (bajo/alto en cada APN) | ALTO | NTS 105 |
| **B8** | **Estimulación Temprana** (pautas por edad en cada control CRED) | MEDIO | NTS 137 |
| **B9** | **Test Peruano de Desarrollo (TPED)** (0-30 meses, alternativo a EEDP) | MEDIO | NTS 137 |
| **B10** | **Controles CRED del RN** (4 controles: 48h, 7d, 14d, 21d) | ALTO | NTS 137 |
| **B11** | **Suplementación hierro/ácido fólico gestante** (desde sem 14) | ALTO | Directiva 069 |
| **B12** | **Partograma incompleto** (falta contracciones) | MEDIO | NTS 105 |
| **B13** | **Control puerperio: 2 controles** (7d + 30d) — solo tabla, sin tracking | MEDIO | NTS 105 |
| **B14** | **Esquema Vacunación no alineado a NTS 196** (faltan: Hepatitis A, Fiebre Amarilla, influenza anual) | ALTO | NTS 196 (RM 884-2022) |

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

### OMOD Nuevos Requeridos

| OMOD | Justificación | Funcionalidad |
|---|---|---|
| **omod-cred-care-plan** | Generar automáticamente las citas CRED según fecha de nacimiento y grupo etario (NTS 137). El cálculo de fechas y la creación masiva de appointments debe ser server-side. | POST `/ws/rest/v1/cred/careplan` → crea N appointments |
| **omod-prenatal-care-plan** | Generar citas prenatales según FUR y calcular edad gestacional. Incluir alertas de tamizaje. | POST `/ws/rest/v1/prenatal/careplan` → crea 6+ appointments |
| **omod-vaccination-schedule** | Generar calendario de vacunación individual según fecha de nacimiento alineado a NTS 196. | POST `/ws/rest/v1/vaccination/schedule` → crea plan individual |
| **omod-risk-classification** | Calcular clasificación de riesgo obstétrico basado en antecedentes y observaciones actuales. | GET `/ws/rest/v1/obstetric-risk/{patientUuid}` → score + clasificación |

### Qué NO debe hacer el OMOD (lo hace el frontend)

- Renderizar tablas, formularios, gráficos
- Navegación entre vistas
- Validación de UI en tiempo real (eso es Zod + react-hook-form)
- Traducciones
- Abrir workspaces/modales

### Qué NO debe hacer el Frontend (lo hace el OMOD)

- Calcular la próxima fecha de cita según normativa
- Crear masivamente appointments (batch)
- Evaluar riesgo obstétrico con reglas complejas
- Generar alertas clínicas basadas en datos históricos
- Validar coherencia clínica de datos (e.g., GTPAL vs embarazo actual)

---

## III. PROPUESTA DE MEJORAS

### FASE 1: Correcciones Inmediatas (Frontend — sin OMOD nuevo)

> Estas mejoras se pueden hacer YA con la API REST existente de OpenMRS.

#### F1.1 — Corregir Config Schema (tipo inconsistente)
**Ya completado** en sesión anterior.

#### F1.2 — Completar Partograma
**Archivo:** `ui/partography/partograph.component.tsx`
- Agregar obtención de frecuencia/duración de contracciones (concept 163750)
- Renderizar en el gráfico existente

#### F1.3 — Controles CRED del Recién Nacido (4 controles)
**Problema:** La config `ageGroupsCRED` agrupa "Recién Nacido (0-29 días)" como un solo grupo.
**Solución:** Agregar sub-controles al grupo RN:
```
RN-48h (2 días)
RN-7d (7 días)
RN-14d (14 días)
RN-21d (21 días)
```
**Archivos a modificar:**
- `config-schema.ts` → agregar subgrupos RN
- `hooks/useAgeGroups.ts` → reconocer subgrupos
- `cred-controls-timeline.component.tsx` → renderizar 4 controles RN

#### F1.4 — Componente de Tamizaje de Anemia
**Nuevo widget:** `anemia-screening.component.tsx`
- Muestra último valor de hemoglobina
- Indica si corresponde tamizaje según edad (6m → semestral, 2a → anual)
- Alerta visual si Hb < 11 g/dL (anemia)
**Slot:** `cred-following-slot` (junto a la matriz CRED)

#### F1.5 — Componente de Suplementación Hierro/MMN (Niño)
**Nuevo widget:** `iron-supplementation-tracker.component.tsx`
- Tracking de sobres MMN entregados (meta: 360 sobres)
- Progress bar visual
- Basado en observaciones del encounter CRED
**Slot:** `cred-following-slot`

#### F1.6 — Componente de Plan de Parto
**Nuevo widget:** `birth-plan.component.tsx`
- Formulario con campos: lugar de parto, transporte, acompañante, donante de sangre, señales de peligro
- Se completa desde 2do trimestre y se actualiza en cada APN
- Workspace tipo form
**Slot:** `prenatal-maternal-history-slot`

#### F1.7 — Clasificación de Riesgo Obstétrico (visual)
**Nuevo widget:** `obstetric-risk-badge.component.tsx`
- Muestra badge: "Bajo Riesgo" (verde) / "Alto Riesgo" (rojo)
- Lee la última observación del concept de clasificación de riesgo
- Se muestra en el header del dashboard prenatal
**Slot:** `prenatal-care-header-slot` (nuevo slot en dashboard prenatal)

#### F1.8 — Tamizaje VIH/Sífilis/HepB (indicadores)
**Nuevo widget:** `screening-indicators.component.tsx`
- Tabla: VIH (resultado, fecha), Sífilis (resultado, fechas: 1ra, sem28, sem32), HepB (resultado, fecha)
- Lee de encounters de laboratorio
- Alerta si falta algún tamizaje según trimestre
**Slot:** `prenatal-maternal-history-slot`

#### F1.9 — Tracking de Suplementación Gestante
**Nuevo widget:** `prenatal-supplementation.component.tsx`
- Hierro elemental 60mg + ácido fólico 400µg desde sem 14
- Si anemia: dosis terapéutica 120mg/día
- Tracking de adherencia
**Slot:** `prenatal-maternal-history-slot`

#### F1.10 — Controles Puerperio (tracking 7d + 30d)
**Mejora a:** `postnatal-care/postpartumControl.component.tsx`
- Agregar indicadores: ¿Control 7d completado? ¿Control 30d completado?
- Alerta si no se ha realizado el control en el plazo
- Badge de "Puérpera Controlada" cuando se completan ambos + hemoglobina + sulfato ferroso

#### F1.11 — Psicoprofilaxis (tracking 6 sesiones)
**Nuevo widget:** `psychoprophylaxis-tracker.component.tsx`
- Contador de sesiones completadas (meta: 6)
- Lee encounters del tipo psicoprofilaxis
- Badge: "Gestante Preparada" cuando completa 6
**Slot:** `prenatal-care-extra-slot` (nuevo)

### FASE 2: Funcionalidades que requieren OMOD nuevo

#### F2.1 — Plan de Cuidado CRED (omod-cred-care-plan)

**Frontend (microfrontend):**
- Botón "Generar Plan CRED" en el dashboard de niño sano
- Muestra calendario de citas generadas
- Permite reagendar citas individuales
- Integración con `appointment-filter-calendar`

**Backend (OMOD):**
- Recibe: `patientUuid`, `birthDate`
- Calcula: todas las fechas de controles según NTS 137
- Crea: N appointments en OpenMRS Appointments module
- Retorna: lista de citas creadas

```
POST /ws/rest/v1/cred/careplan
Body: { patientUuid, birthDate }
Response: { appointments: [...] }
```

**Implementar en:** `hooks/useCreateCarePlanAppointments.ts` (actualmente vacío)
**Implementar en:** `cred-appointments.resource.ts` (actualmente vacío)

#### F2.2 — Plan de Cuidado Prenatal (omod-prenatal-care-plan)

**Frontend:**
- Botón "Generar Plan Prenatal" cuando se registra FUR
- Calendario de 6+ atenciones prenatales
- Alertas de tamizaje por trimestre

**Backend (OMOD):**
- Recibe: `patientUuid`, `FUR (fecha última regla)`
- Calcula: edad gestacional, fechas de APN, fechas de tamizaje
- Crea: 6+ appointments + recordatorios de tamizaje
- Retorna: plan completo

```
POST /ws/rest/v1/prenatal/careplan
Body: { patientUuid, lastMenstrualPeriod }
Response: { appointments: [...], screeningAlerts: [...] }
```

#### F2.3 — Calendario de Vacunación Individual (omod-vaccination-schedule)

**Frontend:**
- Visualización del calendario individual de vacunas
- Estado de cada vacuna: pendiente / aplicada / atrasada
- Alineado a NTS 196

**Backend (OMOD):**
- Recibe: `patientUuid`, `birthDate`
- Calcula: todas las fechas según esquema nacional
- Verifica: inmunizaciones ya aplicadas (FHIR Immunization)
- Retorna: calendario con estados

```
POST /ws/rest/v1/vaccination/schedule
Body: { patientUuid, birthDate }
Response: { vaccines: [{ name, dueDate, status, appliedDate? }] }
```

#### F2.4 — Clasificación de Riesgo Obstétrico (omod-risk-classification)

**Frontend:**
- Badge de riesgo en header prenatal (F1.7)
- Detalle de factores de riesgo identificados

**Backend (OMOD):**
- Recibe: `patientUuid`
- Evalúa: antecedentes, observaciones actuales, factores sociodemográficos
- Calcula: score de riesgo y clasificación
- Retorna: `{ classification: "BAJO"|"ALTO", factors: [...], score: number }`

---

## IV. PLAN DE IMPLEMENTACIÓN

### FASE 1: Correcciones Frontend (4-6 semanas)

```
Semana 1-2: Correcciones base
├── F1.2  Completar partograma (contracciones)
├── F1.3  Subgrupos RN (4 controles CRED neonatal)
└── F1.10 Tracking controles puerperio 7d + 30d

Semana 3-4: Widgets de tracking normativo
├── F1.4  Tamizaje de anemia (widget)
├── F1.5  Suplementación hierro/MMN niño (tracker)
├── F1.9  Suplementación gestante (tracker)
└── F1.8  Indicadores tamizaje VIH/Sífilis/HepB

Semana 5-6: Componentes de gestión
├── F1.6  Plan de Parto (formulario + workspace)
├── F1.7  Badge riesgo obstétrico
└── F1.11 Tracking psicoprofilaxis (6 sesiones)
```

**Dependencias de la Fase 1:**
- Concepts/UUIDs deben existir en el servidor OpenMRS
- Encounter types configurados para cada tipo de atención
- Formularios O3 Form Engine creados para: plan de parto, tamizaje anemia, suplementación

### FASE 2: Desarrollo OMOD (6-8 semanas, en paralelo)

```
Semana 1-3: omod-cred-care-plan
├── Diseño de API REST
├── Lógica de cálculo de fechas según NTS 137
├── Integración con OpenMRS Appointments
└── Tests unitarios

Semana 3-5: omod-prenatal-care-plan
├── Diseño de API REST
├── Cálculo de edad gestacional desde FUR
├── Generación de 6+ citas con alertas de tamizaje
└── Tests unitarios

Semana 5-7: omod-vaccination-schedule
├── Mapeo completo NTS 196 (todas las vacunas por edad)
├── Verificación contra FHIR Immunization existentes
├── Generación de calendario individual
└── Tests unitarios

Semana 7-8: omod-risk-classification
├── Reglas de clasificación según NTS 105
├── Evaluación de antecedentes y factores
└── Tests unitarios
```

### FASE 3: Integración Frontend + OMOD (3-4 semanas)

```
Semana 1-2: Integración CRED
├── F2.1 Implementar useCreateCarePlanAppointments
├── F2.1 Implementar cred-appointments.resource.ts
├── F2.1 Botón "Generar Plan CRED" + visualización
└── F2.3 Calendario de vacunación individual

Semana 3-4: Integración Madre Gestante
├── F2.2 Botón "Generar Plan Prenatal"
├── F2.2 Calendario prenatal con alertas
├── F2.4 Badge de riesgo obstétrico (conectado a OMOD)
└── QA y correcciones
```

---

## V. DETALLE TÉCNICO POR COMPONENTE

### Nuevos Componentes Frontend

#### 1. Tamizaje de Anemia (`anemia-screening.component.tsx`)
```
Ubicación: well-child-care/components/anemia-screening/
Hook: useAnemiaScreening(patientUuid) → { lastHb, lastDate, nextDueDate, isAnemic }
Concept: Hemoglobina (UUID a configurar)
Lógica edad:
  - 6m: primer tamizaje
  - 6m-2a: cada 6 meses
  - 2a-11a: cada año
Render: Card con valor Hb, fecha, alerta si < 11 g/dL
```

#### 2. Suplementación MMN (`iron-supplementation-tracker.component.tsx`)
```
Ubicación: well-child-care/components/supplementation/
Hook: useSupplementationTracker(patientUuid) → { delivered, total: 360, percentage }
Concept: MMN entregados (UUID a configurar)
Render: Progress bar (X/360 sobres), estado, próxima entrega
```

#### 3. Plan de Parto (`birth-plan.component.tsx`)
```
Ubicación: maternal-and-child-health/components/prenatal-care/birth-plan/
Workspace: birth-plan-form-workspace
Campos: lugarParto, transporte, acompanante, donanteSangre, recursosEconomicos,
        documentosListos, senalesPeligroConocidas
Form: O3 Form Engine (requiere form JSON)
Encounter Type: nuevo encounter type "Plan de Parto"
```

#### 4. Clasificación de Riesgo (`obstetric-risk-badge.component.tsx`)
```
Ubicación: maternal-and-child-health/components/prenatal-care/risk-classification/
Hook: useObstetricRisk(patientUuid) → { classification, factors[], lastEvalDate }
Render: Tag "Bajo Riesgo" (green) o "Alto Riesgo" (red) + tooltip con factores
Fase 1: Lee de concept de observación
Fase 2: Conecta a omod-risk-classification
```

#### 5. Indicadores de Tamizaje (`screening-indicators.component.tsx`)
```
Ubicación: maternal-and-child-health/components/prenatal-care/screening/
Hook: useScreeningIndicators(patientUuid) → { vih, sifilis, hepatitisB }
Concepts: VIH result, RPR/VDRL result, HBsAg result (UUIDs a configurar)
Render: Tabla compacta con iconos ✅/⚠️/❌ por cada tamizaje
Alerta: si faltan tamizajes según trimestre actual
```

#### 6. Tracking Psicoprofilaxis (`psychoprophylaxis-tracker.component.tsx`)
```
Ubicación: maternal-and-child-health/components/prenatal-care/psychoprophylaxis/
Hook: usePsychoprophylaxis(patientUuid) → { sessions: number, isComplete: boolean }
Encounter Type: Psicoprofilaxis (UUID a configurar)
Render: Contador X/6 sesiones + badge "Gestante Preparada"
```

### Nuevos Slots Requeridos

| Slot | Dashboard | Componentes |
|---|---|---|
| `prenatal-care-header-slot` | Prenatal | Badge riesgo, badge gestante controlada |
| `prenatal-screening-slot` | Prenatal (tab) | Tamizaje VIH/Sífilis/HepB |
| `prenatal-supplementation-slot` | Prenatal (tab) | Suplementación Fe + Ác. Fólico |
| `prenatal-extra-slot` | Prenatal (tab) | Psicoprofilaxis, Plan de Parto |
| `cred-supplementation-slot` | CRED | Tamizaje anemia, suplementación MMN |

### Modificaciones a Config Schema

```typescript
// Agregar en configSchema:

// Tamizaje de Anemia
anemiaScreening: {
  hemoglobinaConceptUuid: { _type: Type.UUID, _default: '' },
  anemiaThreshold: { _type: Type.Number, _default: 11.0 },
},

// Suplementación
supplementation: {
  mmnConceptUuid: { _type: Type.UUID, _default: '' },
  mmnTotalTarget: { _type: Type.Number, _default: 360 },
  ironConceptUuid: { _type: Type.UUID, _default: '' },
  folicAcidConceptUuid: { _type: Type.UUID, _default: '' },
},

// Plan de Parto
birthPlan: {
  encounterTypeUuid: { _type: Type.UUID, _default: '' },
  formUuid: { _type: Type.UUID, _default: '' },
},

// Tamizaje prenatal
prenatalScreening: {
  vihResultConceptUuid: { _type: Type.UUID, _default: '' },
  sifilisResultConceptUuid: { _type: Type.UUID, _default: '' },
  hepatitisBResultConceptUuid: { _type: Type.UUID, _default: '' },
},

// Psicoprofilaxis
psychoprophylaxis: {
  encounterTypeUuid: { _type: Type.UUID, _default: '' },
  totalSessionsRequired: { _type: Type.Number, _default: 6 },
},

// Riesgo obstétrico
obstetricRisk: {
  classificationConceptUuid: { _type: Type.UUID, _default: '' },
  highRiskConceptUuid: { _type: Type.UUID, _default: '' },
  lowRiskConceptUuid: { _type: Type.UUID, _default: '' },
},

// Subgrupos RN CRED
neonatalCREDControls: {
  control48h: { dayOfLife: 2 },
  control7d: { dayOfLife: 7 },
  control14d: { dayOfLife: 14 },
  control21d: { dayOfLife: 21 },
},
```

---

## VI. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Concepts/UUIDs no existen en servidor | Alta | Bloquea desarrollo | Crear diccionario de concepts antes de empezar la Fase 1 |
| OMOD tarde en desarrollarse | Media | Retrasa Fase 3 | Frontend puede usar mocks y conectar después |
| Formularios O3 no creados | Alta | Bloquea workspaces | Crear JSONs de formularios como primera tarea |
| Esquema de vacunación cambia (RM frecuentes) | Media | Datos incorrectos | Hacer configurable, no hardcodear |
| Performance con muchos widgets nuevos | Baja | UX degradada | Lazy loading agresivo (getAsyncLifecycle) |

---

## VII. RESULTADOS ESPERADOS

### Cumplimiento Normativo

| Normativa | Estado Actual | Estado Objetivo |
|---|---|---|
| NTS 137 (CRED) | 70% | **95%** |
| NTS 105 (Atención Materna) | 60% | **90%** |
| NTS 214 (Atención Neonatal) | 85% | **95%** |
| NTS 196 (Vacunación) | 50% | **90%** |
| NTS 159 (VIH/Sífilis/HepB) | 30% | **85%** |
| Directiva 068 (Suplementación niño) | 0% | **80%** |
| Directiva 069 (Suplementación gestante) | 0% | **80%** |
| RM 361-2011 (Psicoprofilaxis) | 0% | **80%** |

### Escalabilidad
- Todos los concepts configurables via `config-schema.ts`
- Nuevos formularios agregables sin modificar código
- Slots extensibles para futuros widgets
- OMOD independientes y reutilizables

### Mantenibilidad
- Separación estricta frontend/backend
- Hooks reutilizables para cada dominio
- Validación Zod para todos los formularios nuevos
- Traducciones i18n para todo texto nuevo
- Lazy loading para mantener bundle size controlado

---

## VIII. MATRIZ DE DEPENDENCIAS

```
FASE 1 (Frontend puro)
│
├── F1.2 Partograma ──────────────── (concept 163750 debe existir)
├── F1.3 Subgrupos RN ────────────── (sin dependencia externa)
├── F1.4 Tamizaje Anemia ─────────── (concept Hb debe existir)
├── F1.5 Suplementación MMN ──────── (concept MMN debe existir)
├── F1.6 Plan de Parto ───────────── (encounter type + form JSON)
├── F1.7 Badge Riesgo ────────────── (concept riesgo debe existir)
├── F1.8 Tamizaje VIH/Síf/HepB ──── (concepts resultado deben existir)
├── F1.9 Suplementación Gestante ──── (concepts hierro/ác.fólico)
├── F1.10 Tracking Puerperio ──────── (sin dependencia externa)
└── F1.11 Psicoprofilaxis ─────────── (encounter type debe existir)

FASE 2 (OMOD) ← Paralelo a Fase 1
│
├── omod-cred-care-plan ────────────── (depende de: appointments module)
├── omod-prenatal-care-plan ────────── (depende de: appointments module)
├── omod-vaccination-schedule ──────── (depende de: FHIR immunization)
└── omod-risk-classification ──────── (depende de: concepts de riesgo)

FASE 3 (Integración)
│
├── F2.1 Plan CRED ── depende de ── omod-cred-care-plan
├── F2.2 Plan Prenatal ── depende de ── omod-prenatal-care-plan
├── F2.3 Vacunación ── depende de ── omod-vaccination-schedule
└── F2.4 Riesgo OMOD ── depende de ── omod-risk-classification
```

---

## IX. ARCHIVOS A CREAR/MODIFICAR (Fase 1)

### Nuevos archivos (12)

```
src/well-child-care/components/anemia-screening/
├── anemia-screening.component.tsx
└── anemia-screening.scss

src/well-child-care/components/supplementation/
├── iron-supplementation-tracker.component.tsx
└── iron-supplementation-tracker.scss

src/maternal-and-child-health/components/prenatal-care/birth-plan/
├── birth-plan.component.tsx
└── birth-plan.scss

src/maternal-and-child-health/components/prenatal-care/risk-classification/
├── obstetric-risk-badge.component.tsx
└── obstetric-risk-badge.scss

src/maternal-and-child-health/components/prenatal-care/screening/
├── screening-indicators.component.tsx
└── screening-indicators.scss

src/maternal-and-child-health/components/prenatal-care/psychoprophylaxis/
├── psychoprophylaxis-tracker.component.tsx
└── psychoprophylaxis-tracker.scss

src/maternal-and-child-health/components/prenatal-care/supplementation/
├── prenatal-supplementation.component.tsx
└── prenatal-supplementation.scss
```

### Nuevos hooks (7)

```
src/hooks/useAnemiaScreening.ts
src/hooks/useSupplementationTracker.ts
src/hooks/useBirthPlan.ts
src/hooks/useObstetricRisk.ts
src/hooks/useScreeningIndicators.ts
src/hooks/usePsychoprophylaxis.ts
src/hooks/usePrenatalSupplementation.ts
```

### Archivos a modificar (6)

```
src/config-schema.ts                    → Agregar nuevos concepts y configs
src/index.ts                            → Registrar nuevos componentes
src/routes.json                         → Registrar nuevas extensiones y slots
translations/es.json                    → Nuevas traducciones
translations/en.json                    → Nuevas traducciones
src/well-child-care/dashboard.meta.tsx  → (si se agregan slots nuevos)
```
