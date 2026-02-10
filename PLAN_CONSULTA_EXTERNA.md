# Plan: Módulo Consulta Externa v2.0

> **Paquete:** `@pucp-gidis-hiisc/esm-sihsalus-consulta-externa-app` (v1.0.0)
> **Carpeta:** `packages/esm-sihsalus-consulta-externa-app/`
> **Fecha:** 2026-02-09

## Normativa de Referencia
- **NTS 139-MINSA/2018/DGAIN** — Gestión de la Historia Clínica (R.M. 214-2018)
- **NTS 021-MINSA/DGSP-V.03** — Categorías de Establecimientos del Sector Salud
- **Manual General HIS** — Sistema de Información de Consulta Externa (MINSA)
- **SIHCE** — Sistema de Información de Historia Clínica Electrónica (MINSA 2022)

---

## I. DIAGNÓSTICO: CÓDIGO COPIADO DE CRED/MATERNAL

El paquete tiene **~317 archivos** y está severamente contaminado con código copiado del módulo `esm-maternal-and-child-health-app` y de un fork de KenyaEMR. Esto genera confusión arquitectónica, dependencias innecesarias y duplicación.

### A. Directorios/archivos que NO pertenecen a Consulta Externa

#### 1. Growth Chart (56 archivos) — CRED
```
src/ui/growth-chart/                          ← BORRAR TODO
├── growth-chart.component.tsx
├── growth-chart-overview.component.tsx
├── growth-chart.scss
├── hooks/useBiometrics.ts
├── hooks/useChartDataForGender.ts
├── hooks/useChartLines.ts
├── who-data/ (peso, talla, PC por género)
└── ... (56 archivos total)
```
**Por qué:** Curvas de crecimiento WHO son exclusivas de CRED (niño sano). No aplican a consulta externa general.

#### 2. Obstetric History Widget (6 archivos) — Maternal
```
src/ui/obstetric-history-widget/              ← BORRAR TODO
├── obstetric-history-base.tsx
├── obstetric-history-table.component.tsx
├── obstetric-history-chart.component.tsx
├── obstetric-history.scss
└── ...
```
**Por qué:** GTPAL y antecedentes obstétricos pertenecen al módulo maternal.

#### 3. Cervical Length Chart (3 archivos) — Maternal/Obstétrico
```
src/ui/alturaCuello-chart/                    ← BORRAR TODO
├── altura-cuello-chart.component.tsx
├── altura-cuello-overview.component.tsx
└── altura-cuello.scss
```
**Por qué:** Longitud cervical por semana gestacional es seguimiento prenatal.

#### 4. Neonatal Summary — CRED
```
src/clinical-encounter/summary/neonatal summary/  ← BORRAR
└── neonatal-summary.component.tsx
```

#### 5. Maternal Summary — Maternal
```
src/clinical-encounter/summary/maternal-summary/  ← BORRAR
└── maternal-summary.component.tsx
```

### B. Hooks que NO pertenecen (12 hooks)

| Hook | Dominio | Acción |
|---|---|---|
| `useAppointmentsCRED.ts` | CRED | BORRAR |
| `useCephaloCaudalNeurologicalEvaluation.ts` | CRED (neonatal) | BORRAR |
| `useCREDFormsForAgeGroup.ts` | CRED | BORRAR |
| `useEncountersCRED.ts` | CRED | BORRAR |
| `usePartograph.ts` | Maternal (parto) | BORRAR |
| `useVaccinationSchema.ts` | CRED (vacunas) | BORRAR |
| `useNeonatalSummary.ts` | CRED (neonatal) | BORRAR |
| `useVitalNewBorn.ts` | CRED (neonatal) | BORRAR |
| `useLaunchCREDForm.ts` | CRED | BORRAR |
| `useImmediateNewbornAttentions.ts` | CRED (neonatal) | BORRAR |
| `usePostpartumControl.ts` | Maternal | BORRAR |
| `useAlojamientoConjuntoSummary.ts` | CRED (neonatal) | BORRAR |

### C. Hooks que PODRÍAN quedarse pero necesitan revisión

| Hook | Dominio | Acción |
|---|---|---|
| `usePrenatalAntecedents.ts` (17.5KB) | Maternal | BORRAR si solo lo usa obstetric-history-widget |
| `usePrenatalCare.ts` (7.7KB) | Maternal | BORRAR si solo lo usa obstetric-history-widget |
| `usePrenatalMeasurements.ts` | Maternal | BORRAR |
| `useInmmediatePostpartum.ts` | Maternal | BORRAR |
| `useCurrentPregnancy.ts` | Maternal | BORRAR |
| `useAgeGroups.ts` | CRED | BORRAR |
| `useAgeRanges.ts` | CRED | BORRAR |

### D. Config schema — secciones a BORRAR

| Sección | Líneas aprox. | Dominio |
|---|---|---|
| `madreGestante` (Sec. 8) | 386-437 | Maternal: GTPAL, FUR, antecedentes obstétricos |
| `CRED` (Sec. 9) | 439-658 | CRED: APGAR, reflejos, evaluación neonatal, anatomía |
| `ageGroupsCRED` (Sec. 10) | 660-688 | CRED: 13 grupos etarios |
| `CREDFormsByAgeGroup` (Sec. 17) | 837-927 | CRED: EEDP, TEPSI, formularios por edad |

Conceptos del `concepts` object que son neonatales/CRED:
- `newbornVitalSignsConceptSetUuid`, `consultationTime`, `controlNumber`, `attendedAge`
- `stoolCountUuid`, `stoolGramsUuid`, `urineCountUuid`, `urineGramsUuid`, `vomitCountUuid`, `vomitGramsMLUuid` (balance de líquidos neonatal)
- `headCircumferenceUuid`, `chestCircumferenceUuid` (antropometría pediátrica)

### E. Encounter types a BORRAR del config

| Encounter Type | Dominio |
|---|---|
| `alojamientoConjunto` | CRED (neonatal) |
| `prenatalControl` | Maternal |
| `postnatalControl` | Maternal |
| `deliveryRoomCare` | Maternal (parto) |
| `obstetricUltrasound` | Maternal |
| `antecedentesPerinatales` | Maternal/CRED |
| `healthyChildControl` | CRED |
| `atencionInmediata` | CRED (neonatal) |
| `cefaloCaudal` | CRED (neonatal) |
| `consejeriaMaterna` | Maternal |
| `vaccinationAdministration` | CRED |

### F. Forms list — entradas a BORRAR

Todas las entradas bajo `// Maternal Forms`:
- `prenatal`, `postNatal`, `maternalHistory`, `deliveryOrAbortion`, etc.

Todas las entradas bajo `// CRED Forms`:
- `atencionImmediataNewborn`, `breastfeedingObservation`, `newbornNeuroEval`, `roomingIn`, etc.

Todas las entradas bajo `// EEDP Forms`:
- `eedp2Months` through `eedp21Months`, `tepsi`

Entradas bajo `// Assessment Forms` (CRED):
- `riskInterview0to30`, `childFeeding0to5`, `childFeeding6to42`, `childAbuseScreening`

Entradas bajo `// Hospital Forms` que son obstétricas:
- `puerperiumLab`, `obstetricMonitor`, `obstetricHistory`, `obstetricProgress`, `obstetricAntecedents`, `birthPlanForm`, `birthSummary`, `puerperiumEpicrisis`, `puerperiumDischarge`, `clinicalHistory`

### G. index.ts — exports a BORRAR

```typescript
// BORRAR: Obstetric
import { ObstetricHistoryBase } from './ui/obstetric-history-widget';
export const obstetricHistoryChart = getSyncLifecycle(ObstetricHistoryBase, options);

// BORRAR: Growth chart (CRED)
export const growthChart = getAsyncLifecycle(
  () => import('./ui/growth-chart/growth-chart-overview.component'), options);

// BORRAR: Cervical length (Maternal)
export const alturaUterinaChart = getAsyncLifecycle(
  () => import('./ui/alturaCuello-chart/altura-cuello-overview.component'), options);
```

### H. routes.json — extensión a BORRAR

```json
{
  "name": "prenatal-family-history",
  "component": "familyHistory",
  "slot": "neonatal-perinatal-slot"    ← Slot de módulo maternal
}
```

### I. Traducciones a limpiar (es.json + en.json)

Claves que pertenecen a CRED/Maternal y deben borrarse (~100+ claves):
- Todo lo de APGAR, neonatal, newborn, partograph, TEPSI, EEDP
- Todo lo de obstetric, prenatal, postpartum, puerperio, cervicalLength
- Todo lo de growth chart, percentiles, z-scores
- Todo lo de vaccination, immunization schedule
- Todo lo de alojamiento conjunto, lactancia materna
- Todo lo de edad gestacional, embarazo, parto

### J. ConfigObject interface — limpiar

La interface `ConfigObject` (líneas 975-1140) tiene propiedades de CRED/Maternal:
- `madreGestante: Record<string, string>`
- `CRED: Record<string, string>`
- `CREDFormsByAgeGroup`
- `ageGroupsCRED: AgeRange[]`
- `partography: PartographyConfigObject`
- Múltiples encounter types maternales/CRED en `encounterTypes`
- Múltiples forms CRED/maternal en `formsList`

Interfaces a BORRAR:
- `PartographyConfigObject`
- `PartograpyComponents`
- `AgeRange`

---

## II. LO QUE SE QUEDA (funcional y apropiado)

### Componentes legítimos de Consulta Externa

| Dominio | Componentes | Archivos |
|---|---|---|
| **Clinical Encounter Dashboard** | Dashboard general, summaries ambulatorio/quirúrgico | `clinical-encounter/dashboard/`, `summary/out-patient-summary/`, `summary/in-patient-summary/` |
| **Case Management** | Seguimiento de pacientes, workspace, encounters | `case-management/` (~10 archivos) |
| **Relationships** | Familia, PNS, contactos, otros | `relationships/`, `family-partner-history/`, `other-relationships/`, `contact-list/` |
| **Specialized Clinics** | Odontología, Psicología, Terapia Física | `specialized-clinics/generic-nav-links/` |
| **HIV/HTS** | Testing, screening, defaulter tracing | `specialized-clinics/hiv-care-and-treatment-services/` |
| **Conditions/Antecedentes** | CRUD de condiciones médicas | `ui/conditions-filter/` |
| **Appointments** | Calendario, filtro mensual | `ui/appointment-filter-calendar/`, `ui/patient-appointments/` |
| **Forms Selector** | Workspace genérico de selección de formularios | `ui/forms-selector/` |
| **Dashboard Groups** | Agrupación dinámica de vistas | `clinical-view-group/` |
| **Social History** | Dashboard link + vista | Extensión en routes.json |
| **UI Tables** | Data tables genéricos | `ui/data-table/` |

### Hooks legítimos

| Hook | Uso |
|---|---|
| `useClinicalEncounter.ts` | Encuentros clínicos generales |
| `useEncounters.ts` | Obtener encounters del paciente |
| `useEncounterRows.ts` | Formatear filas de encounters |
| `useFilteredEncounter.ts` | Filtrar encounters por tipo |
| `useLatestEncounter.ts` | Último encounter |
| `useCreateCarePlanAppointments.ts` | Crear citas |
| `useProviders.ts` | Lista de proveedores |
| `useSchemasConceptSet.ts` | Manejar concept sets |
| `useContacts.ts` | Contactos del paciente |
| `useRelationship.ts` | Datos de relación |
| `useRelationshipTypes.ts` | Tipos de relación |
| `useRelativeHivEnrollment.ts` | Inscripción VIH de contactos |
| `useRelativeHTSEncounter.ts` | Encounter HTS de contactos |
| `usePatientTracing.ts` | Rastreo de pacientes |

---

## III. BRECHAS VS NORMA PERUANA (lo que FALTA)

### Fase 0: Limpieza (prerequisito)

| # | Tarea | Archivos afectados | Impacto |
|---|---|---|---|
| CE-0A | Borrar `src/ui/growth-chart/` completo | 56 archivos | Elimina dependencia innecesaria de WHO data |
| CE-0B | Borrar `src/ui/obstetric-history-widget/` | 6 archivos | Elimina GTPAL |
| CE-0C | Borrar `src/ui/alturaCuello-chart/` | 3 archivos | Elimina longitud cervical |
| CE-0D | Borrar summaries neonatal + maternal | 2 directorios | Elimina summaries de parto |
| CE-0E | Borrar 12+ hooks CRED/Maternal | 12-19 archivos | Hooks sin consumidores |
| CE-0F | Limpiar config-schema.ts (secciones 8,9,10,17) | 1 archivo | ~300 líneas menos |
| CE-0G | Limpiar config-schema.ts encounter types y forms | 1 archivo | Quitar encounters/forms CRED/Maternal |
| CE-0H | Limpiar ConfigObject interface | 1 archivo | Quitar propiedades huérfanas |
| CE-0I | Limpiar index.ts (quitar exports de growth, obstetric, cervical) | 1 archivo | 3 exports menos |
| CE-0J | Limpiar routes.json (quitar prenatal-family-history) | 1 archivo | 1 extensión menos |
| CE-0K | Limpiar traducciones es.json + en.json | 2 archivos | ~100+ claves menos |
| CE-0L | Verificar que no queden imports rotos después de limpieza | Todos | Build debe compilar |

**Estimado:** ~80-100 archivos borrados/modificados. El paquete pasará de ~317 a ~220 archivos.

### Fase 1: Frontend — Consulta Externa Peruana

| # | Brecha | Norma | Prioridad | Detalle |
|---|---|---|---|---|
| CE-1 | **Flujo de Triaje secuencial** | NTS 021 | ALTA | El triaje existe como captura de vitales pero no como paso obligatorio previo a consulta. Necesita: cola → vitales → asignación a consultorio. Evaluar integración con `@openmrs/esm-service-queues-app` |
| CE-2 | **Clasificación diagnóstica P/D + N/R** | NTS 139 | ALTA | Cada diagnóstico: Presuntivo/Definitivo + Nuevo/Repetido. OpenMRS tiene `certainty`, falta `occurrence` |
| CE-3 | **Motivo de consulta obligatorio** | NTS 139 | MEDIA | Campo obligatorio al inicio de cada encuentro. Concept CIEL 5219 "Chief Complaint" |
| CE-4 | **Plan de tratamiento estructurado** | NTS 139 | MEDIA | Exámenes auxiliares, procedimientos CPMS, receta, indicaciones, interconsulta, próxima cita |
| CE-5 | **Notas de evolución SOAP** | NTS 139 | MEDIA | Subjetivo / Objetivo / Apreciación / Plan |
| CE-6 | **Financiador/SIS por encuentro** | HIS | MEDIA | Dropdown: SIS, EsSalud, Privado, Particular |
| CE-7 | **Pertenencia étnica** | HIS | BAJA | Campo en filiación para reporte HIS |

### Fase 2: OMODs backend

| # | Brecha | Norma | Prioridad |
|---|---|---|---|
| CE-8 | **Reporte HIS automático** | Manual HIS | ALTA |
| CE-9 | **Referencia/Contrareferencia** | NTS 139 | ALTA |
| CE-10 | **Cola de Triaje → Consultorio** | NTS 021 | ALTA |
| CE-11 | **Mapeo CIE-10 ↔ CIEL** | NTS 139 | ALTA |
| CE-12 | **Receta PNUME** | NTS 139 | MEDIA |
| CE-13 | **Firma digital** | NTS 139 | BAJA |

### Fase 3: Integraciones externas

| # | Brecha | Sistema |
|---|---|---|
| CE-14 | Integración SIS | Seguro Integral de Salud |
| CE-15 | Reporte REUNIS | Repositorio Nacional |
| CE-16 | Integración RENIEC | Validación DNI |

---

## IV. PLAN DE IMPLEMENTACIÓN

### Fase 0: Limpieza (~1-2 días)

**Orden de ejecución:**
1. Borrar directorios completos: `growth-chart/`, `obstetric-history-widget/`, `alturaCuello-chart/`, summaries neonatal/maternal
2. Borrar hooks CRED/Maternal de `src/hooks/`
3. Limpiar `index.ts`: quitar imports y exports de lo borrado
4. Limpiar `routes.json`: quitar `prenatal-family-history`
5. Limpiar `config-schema.ts`: borrar secciones 8 (madreGestante), 9 (CRED), 10 (ageGroupsCRED), 17 (CREDFormsByAgeGroup); limpiar encounter types, forms, concepts de CRED/Maternal; limpiar ConfigObject interface
6. Limpiar traducciones: borrar claves huérfanas de es.json y en.json
7. Build + verificar que compila sin errores

### Fase 1: Frontend (~4-6 semanas)

#### CE-1: Flujo de Triaje Secuencial
**Archivos:**
- `src/triage/triage-queue.component.tsx` — Cola de pacientes
- `src/triage/triage-form.workspace.tsx` — Formulario de vitales
- `src/config-schema.ts` — Agregar sección `triage`

**Campos obligatorios (NTS 021):**
- Peso (kg), Talla (cm), PA (mmHg), FC (lpm), FR (rpm), Temp (°C), SpO2
- IMC — auto-calculado
- Superficie corporal — auto-calculada

**UI:** Tab "Triaje" con: lista pendientes → formulario vitales → botón "Enviar a consultorio"

#### CE-2: Clasificación Diagnóstica P/D + N/R
**Archivos:**
- `src/clinical-encounter/diagnosis/diagnosis-classification.component.tsx`
- `src/hooks/useDiagnosisClassification.ts`

**Modelo:**
```
Diagnóstico = {
  concept: UUID (CIEL),
  cie10Code: string,
  certainty: 'PRESUMPTIVE' | 'DEFINITIVE',
  occurrence: 'NEW' | 'REPEAT',
}
```

#### CE-3: Motivo de Consulta
- Campo obligatorio texto libre al inicio de cada encounter
- Concept CIEL 5219 "Chief Complaint"

#### CE-4: Plan de Tratamiento Estructurado
- Exámenes auxiliares (link a Laboratory)
- Procedimientos (código CPMS)
- Receta médica (link a Medications)
- Indicaciones terapéuticas (texto libre)
- Interconsulta (referencia a especialista)
- Próxima cita (link a Appointments)

#### CE-5: Notas SOAP
- **S** (Subjetivo) — Lo que refiere el paciente
- **O** (Objetivo) — Hallazgos del examen físico
- **A** (Apreciación) — Diagnóstico/interpretación
- **P** (Plan) — Plan de tratamiento

#### CE-6: Financiador/SIS
- Dropdown al inicio de cada encounter
- Answers: SIS, EsSalud, Privado, Particular

---

## V. ARQUITECTURA POST-LIMPIEZA

```
Consulta Externa (patient-chart)
├── Admisión / Filiación          ← OpenMRS registration (existente)
├── Triaje                        ← CE-1 (nuevo)
│   ├── Cola de espera
│   ├── Formulario de vitales
│   └── Asignación a consultorio
├── Consulta                      ← Dashboard principal (mejorado)
│   ├── Motivo de consulta        ← CE-3 (nuevo)
│   ├── Anamnesis                 ← Existente (conditions-filter)
│   ├── Examen físico             ← Existente (vitales)
│   ├── Diagnóstico               ← CE-2 (nuevo: P/D + N/R + CIE-10)
│   ├── Plan de tratamiento       ← CE-4 (nuevo)
│   └── Notas SOAP                ← CE-5 (nuevo)
├── Clínicas Especializadas       ← Existente
│   ├── Odontología
│   ├── Psicología
│   └── Terapia Física
├── VIH/SIDA                      ← Existente (HTS, defaulter tracing)
├── Relaciones / Familia          ← Existente
├── Historia Social               ← Existente
└── Case Management               ← Existente
```

---

## VI. CONCEPTS NECESARIOS

### Nuevos (a crear en OCL/servidor)
| Concepto | Tipo | Uso |
|---|---|---|
| Motivo de consulta | Text | CE-3 (o reusar CIEL 5219) |
| Tipo de financiador | Coded | CE-6 |
| Ocurrencia del diagnóstico | Coded | CE-2 (answers: Nuevo, Repetido) |

### Existentes (reusar)
| Concepto | Fuente | Uso |
|---|---|---|
| Chief Complaint (CIEL:5219) | CIEL | CE-3 |
| Diagnosis Certainty | OpenMRS core | CE-2 (P/D) |
| Vital signs (Weight, Height, BP, HR, RR, Temp, SpO2) | CIEL | CE-1 |
| BMI | CIEL | CE-1 |

---

## VII. ENCOUNTER TYPES

### Se quedan
| UUID | Nombre | Uso |
|---|---|---|
| existente | Consulta Externa | Encuentro principal |
| existente | Triage | `67a71486-...` ya definido |
| existente | Specialized Consultation | Consulta especializada |
| existente | Emergency Care | Emergencia |
| existente | Hospitalization + Discharge | Hospitalización |
| existente | Dental/Mental Health | Clínicas especializadas |
| existente | HIV Testing | VIH |

### Se borran
Todos los de CRED (healthyChildControl, atencionInmediata, cefaloCaudal, vaccinationAdministration, alojamientoConjunto, consejeriaMaterna) y Maternal (prenatalControl, postnatalControl, deliveryRoomCare, obstetricUltrasound, antecedentesPerinatales).

---

## VIII. CRONOGRAMA

| Fase | Tareas | Duración |
|---|---|---|
| **Fase 0** | Limpieza de código CRED/Maternal | 1-2 días |
| **Fase 1** | CE-1 a CE-7 (Frontend) | 4-6 semanas |
| **Fase 2** | CE-8 a CE-13 (OMODs) | 8-12 semanas |
| **Fase 3** | CE-14 a CE-16 (Integraciones) | 12-16 semanas |

---

## IX. RIESGOS

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Limpieza rompe imports internos | Alta | Build falla | Hacer limpieza iterativa: borrar → build → fix → repeat |
| Hooks borrados eran usados por componentes legítimos | Media | Componentes rotos | Grep exhaustivo antes de borrar cada hook |
| `@openmrs/esm-service-queues-app` no cubre triaje peruano | Media | CE-1 requiere custom | Evaluar capacidades del módulo antes de desarrollar |
| Mapeo CIE-10 incompleto | Alta | Bloquea HIS | Usar tablas CIEL→ICD-10 existentes en OpenMRS |
| PNUME no disponible como dataset | Media | Bloquea CE-12 | Obtener lista de DIGEMID como CSV |

---

## X. RELACIÓN CON OTROS MÓDULOS

| Módulo | Relación |
|---|---|
| `esm-maternal-and-child-health-app` | CRED + Maternal van EN SU PROPIO módulo, NO en Consulta Externa |
| `esm-patient-immunizations-app` | Vacunación es un módulo aparte |
| `@openmrs/esm-service-queues-app` | Posible base para cola de triaje (CE-1/CE-10) |
| `@openmrs/esm-patient-vitals-app` | Reutilizar para formulario de vitales en triaje |
| `sihsalus-content-referenceapplication` | Forms Ampath + encounter types + concepts |
