# SIHSALUS ESM Modules - Guía para Claude/GitHub Copilot

## Descripción del Proyecto
Monorepo de módulos ESM (ECMAScript Modules) para OpenMRS 3.x específicamente diseñado para el sistema SIHSALUS del ecosistema de salud peruano. Contiene microfrontends especializados en integración DYAKU, FUA/HIS, y salud materno-infantil según directrices MINSA.

## Comandos Esenciales

### Desarrollo
```bash
# Instalar dependencias
yarn install

# Configurar entorno
cp example.env .env

# Levantar TODOS los módulos (resource intensive - usar solo cuando sea necesario)
yarn start

#Usar backend http://hii1sc-qlty.inf.pucp.edu.pe

# Módulo específico (RECOMENDADO para desarrollo diario)
yarn start --sources 'packages/esm-maternal-and-child-health'
yarn start --sources 'packages/esm-patient-search-app'
yarn start --sources 'packages/esm-patient-registration-app'
yarn start --sources 'packages/esm-dyaku-app'
yarn start --sources 'packages/esm-fua-app'
yarn start --sources 'packages/esm-billing-app'

# Múltiples módulos relacionados
yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-registration-app'
```

### Build y Testing
```bash
# Build completo con Turborepo
yarn turbo build

# Build específico
yarn turbo build --filter=esm-maternal-and-child-health

# Testing
yarn test                    # Unit tests con Jest
yarn test:watch             # Tests en modo watch
yarn test-e2e               # End-to-end con Playwright

# Verificación completa (lint + test + typescript)
yarn verify
```

### Gestión de Versiones
```bash
# Releases automáticos
yarn release:patch         # v1.0.0 -> v1.0.1
yarn release:minor         # v1.0.0 -> v1.1.0  
yarn release:major         # v1.0.0 -> v2.0.0

# Publishing
yarn ci:prepublish         # Publish to @next tag
yarn ci:publish            # Publish to @latest tag
```

## Arquitectura del Proyecto

### Stack Tecnológico Principal
- **Frontend**: React 18+ con TypeScript
- **Build**: Webpack 5 + Module Federation
- **Package Manager**: Yarn 3 con workspaces
- **Monorepo**: Turborepo para builds optimizados
- **Testing**: Jest + React Testing Library + Playwright
- **UI Library**: Carbon Design System (@carbon/react)
- **OpenMRS**: Framework ESM next

### Estructura de Módulos ESM
```
packages/
├── esm-maternal-and-child-health/    # Salud materno-infantil (módulo principal)
├── esm-dyaku-app/                   # Integración DYAKU FHIR R4
├── esm-fua-app/                     # Formato Único de Atención
├── esm-billing-app/                 # Facturación y reportes HIS
├── esm-patient-search-app/          # Búsqueda de pacientes (fork mejorado)
├── esm-patient-registration-app/    # Registro de pacientes (fork mejorado)
├── esm-patient-immunizations-app/   # Inmunizaciones
└── esm-sihsalus-widgets-app/       # Widgets comunes SIHSALUS
```

## Patrones de Desarrollo ESM

### Estructura Estándar de un Módulo
```typescript
// src/index.ts - Entry point del módulo ESM
export const importTranslation = () => import("./translations");

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const routes = [
  {
    name: "maternal-health",
    component: () => import("./maternal-health/maternal-health.component"),
    route: /^\/patient\/.+\/maternal-health/,
  },
];
```

### Configuración de Módulo (config-schema.ts)
```typescript
export const configSchema = {
  sections: {
    _type: Type.Object,
    _default: {
      "antenatal-care": {
        displayText: "Atención Prenatal",
        headerTitle: "Atención Prenatal",
      },
    },
  },
};
```

### Componente Típico con Carbon + OpenMRS
```typescript
import { Button, DataTable } from "@carbon/react";
import { useConfig, openmrsFetch } from "@openmrs/esm-framework";

export const MaternalHealthComponent: React.FC = () => {
  const config = useConfig();
  // Usar openmrsFetch para APIs
  // Implementar según patrones Carbon Design System
};
```

## Convenciones del Proyecto

### Naming Conventions
- **Paquetes**: `esm-[feature-name]-app` 
- **Componentes**: PascalCase con `.component.tsx`
- **Tests**: `[component-name].test.tsx`
- **Traducciones**: `en.json`, `es.json`

### Estructura de Archivos Estándar
```
src/
├── components/           # Componentes reutilizables
├── [feature-folders]/    # Funcionalidades específicas
├── hooks/               # React hooks personalizados
├── types/               # Definiciones TypeScript
├── config-schema.ts     # Configuración del módulo
├── constants.ts         # Constantes del módulo
├── index.ts            # Entry point ESM
└── root.component.tsx   # Componente raíz
```

## Troubleshooting Común

### Problema: `yarn start` no levanta todos los módulos
**Soluciones:**
1. Usar desarrollo por módulo específico (recomendado): `yarn start --sources 'packages/esm-[module]'`
2. Verificar recursos del sistema (RAM/CPU)
3. Limpiar cache: `yarn turbo clean && rm -rf node_modules && yarn install`
4. Verificar configuración OpenMRS CLI: `openmrs --version`

### Problema: Errores de build en módulos específicos
```bash
# Verificar errores específicos
yarn turbo build --filter=esm-[module-name] --verbose

# Limpiar y rebuild
yarn turbo clean --filter=esm-[module-name]
yarn turbo build --filter=esm-[module-name]
```

### Problema: Tests fallando
```bash
# Test específico con logs detallados
yarn test --testNamePattern="ComponentName" --verbose

# Actualizar snapshots
yarn test --updateSnapshot
```

## Desarrollo con Contexto SIHSALUS

### Integración DYAKU (Padrón Nacional)
- Usar endpoints FHIR R4 para sincronización
- Validar datos según estándares MINSA
- Implementar retry logic para APIs externas

### Reportes FUA/HIS
- Seguir formatos oficiales MINSA
- Implementar validaciones específicas peruanas
- Usar componentes de formularios estandarizados

### Salud Materno-Infantil
- Módulo principal del proyecto
- Implementar según protocolo materno-infantil MINSA
- Integrar con widgets de seguimiento

## Datos de Prueba y Mocks
```typescript
// Usar mocks centralizados desde __mocks__/
import { mockPatient } from "../__mocks__/patient.mock";
import { mockVisit } from "../__mocks__/visits.mock";
```

## Variables de Entorno Críticas
```bash
# Copiar desde example.env
OPENMRS_API_URL=          # URL del backend OpenMRS
DYAKU_API_URL=            # URL API DYAKU MINSA  
FUA_SERVICE_URL=          # URL servicio FUA
```

## Enlaces Importantes
- [OpenMRS 3.x Microfrontends](https://o3-dev.docs.openmrs.org/)
- [Carbon Design System](https://carbondesignsystem.com/developing/frameworks/react/)
- [Repositorio GitHub](https://github.com/PROYECTO-SANTACLOTILDE/sihsalus-esm-modules)
- [Documentación MINSA](https://www.minsa.gob.pe/)

---
*Actualización: Agosto 13, 2025*
*Proyecto: SIH SALUS PUCP-GIDIS-HIISC*