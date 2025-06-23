# Sistema de Conditions Reutilizable - Antecedentes Patológicos

Este documento describe la implementación del sistema reutilizable de conditions para el módulo de Well Child Care, específicamente para "Antecedentes Patológicos del Menor".

## Arquitectura del Sistema

### 1. Componentes Genéricos Reutilizables

#### `GenericConditionsOverview`
- **Ubicación**: `src/ui/conditions-filter/generic-conditions-overview.component.tsx`
- **Propósito**: Componente base reutilizable para mostrar conditions filtradas por ConceptSet
- **Props**:
  - `patientUuid`: UUID del paciente
  - `conceptSetUuid`: UUID del ConceptSet específico
  - `title`: Título a mostrar en el componente
  - `workspaceFormId`: ID del workspace form (opcional)
  - `enableAdd`: Habilitar botón de agregar (opcional)
  - `urlPath`: Ruta URL personalizada (opcional)

#### `ConditionsFormWorkspace` (Actualizado)
- **Ubicación**: `src/ui/conditions-filter/conditions-form.workspace.tsx`
- **Actualización**: Ahora acepta `workspaceProps` para pasar configuración específica
- **Nueva prop**: `workspaceProps` con `conceptSetUuid` y `title`

#### `ConditionsWidget` (Actualizado)
- **Ubicación**: `src/ui/conditions-filter/conditions-widget.component.tsx`
- **Actualización**: Usa configuración dinámica del ConceptSet basada en `workspaceProps`

### 2. Componente Específico - Antecedentes Patológicos

#### `AntecedentesPatologicos`
- **Ubicación**: `src/well-child-care/antecedentes-patologicos.component.tsx`
- **Propósito**: Implementación específica para antecedentes patológicos
- **Características**:
  - Usa configuración desde `config-schema`
  - Wrapper del componente genérico
  - Configuración automática del ConceptSet

#### `AntecedentesPatologicosFormWorkspace`
- **Ubicación**: `src/well-child-care/antecedentes-patologicos-form.workspace.tsx`
- **Propósito**: Workspace específico para antecedentes patológicos
- **Características**:
  - Configura automáticamente el ConceptSet correcto
  - Wrapper del workspace genérico

### 3. Configuración del Sistema

#### Schema de Configuración
```typescript
// En config-schema.ts
conditionConceptSets: {
  antecedentesPatologicos: {
    uuid: 'c33ef45d-aa69-4d9a-9214-1dbb52609601',
    title: 'Antecedentes Patológicos del Menor',
    description: 'ConceptSet para antecedentes patológicos en menores'
  }
}
```

## Cómo Usar el Sistema

### Para Implementar un Nuevo Tipo de Conditions:

1. **Agregar configuración al schema**:
```typescript
// En config-schema.ts
conditionConceptSets: {
  nuevoTipo: {
    uuid: 'uuid-del-concept-set',
    title: 'Título del Nuevo Tipo',
    description: 'Descripción del nuevo tipo'
  }
}
```

2. **Crear componente específico**:
```typescript
// nuevo-tipo.component.tsx
import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import type { ConfigObject } from '../config-schema';
import GenericConditionsOverview from '../ui/conditions-filter/generic-conditions-overview.component';

const NuevoTipo: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const config = useConfig<ConfigObject>();
  const conceptSetConfig = config?.conditionConceptSets?.nuevoTipo;
  
  if (!conceptSetConfig) return null;

  return (
    <GenericConditionsOverview
      patientUuid={patientUuid}
      conceptSetUuid={conceptSetConfig.uuid}
      title={conceptSetConfig.title}
      workspaceFormId="nuevo-tipo-form-workspace"
      enableAdd={true}
      urlPath="NuevoTipo"
    />
  );
};
```

3. **Crear workspace específico**:
```typescript
// nuevo-tipo-form.workspace.tsx
import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { type DefaultPatientWorkspaceProps } from '@openmrs/esm-patient-common-lib';
import type { ConfigObject } from '../config-schema';
import ConditionsFormWorkspace from '../ui/conditions-filter/conditions-form.workspace';

const NuevoTipoFormWorkspace: React.FC<DefaultPatientWorkspaceProps> = (props) => {
  const config = useConfig<ConfigObject>();
  const conceptSetConfig = config?.conditionConceptSets?.nuevoTipo;
  
  if (!conceptSetConfig) return null;

  const workspaceProps = {
    conceptSetUuid: conceptSetConfig.uuid,
    title: conceptSetConfig.title,
  };

  return <ConditionsFormWorkspace {...props} formContext="creating" workspaceProps={workspaceProps} />;
};
```

4. **Registrar en index.ts**:
```typescript
export const nuevoTipo = getAsyncLifecycle(
  () => import('./path/nuevo-tipo.component'),
  options,
);

export const nuevoTipoFormWorkspace = getAsyncLifecycle(
  () => import('./path/nuevo-tipo-form.workspace'),
  options,
);
```

5. **Agregar a routes.json**:
```json
{
  "component": "nuevoTipo",
  "slot": "slot-donde-se-muestra"
},
{
  "component": "nuevoTipoFormWorkspace",
  "name": "nuevo-tipo-form-workspace"
}
```

## Beneficios del Sistema

### 1. Reutilización de Código
- Un solo componente base para todos los tipos de conditions
- Lógica común centralizada
- Reducción de duplicación de código

### 2. Configurabilidad
- ConceptSets configurables vía schema
- Títulos y descripciones personalizables
- Flexibilidad en la configuración por ambiente

### 3. Mantenibilidad
- Cambios en un solo lugar afectan todos los componentes
- Fácil agregar nuevos tipos de conditions
- Separación clara de responsabilidades

### 4. Consistencia UI/UX
- Misma interfaz para todos los tipos
- Comportamiento uniforme
- Experiencia consistente para el usuario

## Estructura de Archivos

```
src/
├── ui/conditions-filter/
│   ├── generic-conditions-overview.component.tsx    # Componente base reutilizable
│   ├── conditions-form.workspace.tsx                # Workspace genérico (actualizado)
│   ├── conditions-widget.component.tsx              # Widget genérico (actualizado)
│   └── conditions.resource.ts                       # Recursos y hooks
├── well-child-care/
│   ├── antecedentes-patologicos.component.tsx       # Implementación específica
│   ├── antecedentes-patologicos-form.workspace.tsx  # Workspace específico
│   └── README.md                                     # Esta documentación
├── config-schema.ts                                 # Schema de configuración (actualizado)
└── index.ts                                         # Exports (actualizado)
```

## Próximos Pasos

1. Implementar más tipos de conditions (alergias, medicamentos, etc.)
2. Agregar validaciones específicas por tipo
3. Implementar filtros avanzados
4. Agregar funcionalidad de reportes
5. Integrar con otros módulos del sistema

## Notas de Desarrollo

- Todos los componentes usan TypeScript estricto
- Se implementa lazy loading para optimización
- Configuración centralizada para fácil mantenimiento
- Hooks personalizados para lógica de negocio
- Componentes completamente tipados
