![Node.js CI](https://github.com/sihsalus/openmrs-esm-sihsalus-modules/workflows/Node.js%20CI/badge.svg)

# SIH SALUS ESM Modules

Colección de módulos microfrontend para SIH SALUS, una distribución especializada de OpenMRS 3.x adaptada al ecosistema de salud peruano y las directrices del MINSA.

## 📋 Tabla de Contenidos

- [🏥 Características Principales](#-características-principales)
- [📦 Packages Incluidos](#-packages-incluidos)
- [🚀 Tecnologías](#-tecnologías)
- [⚙️ Configuración Inicial](#️-configuración-inicial)
- [🛠️ Scripts de Desarrollo](#️-scripts-de-desarrollo)
- [🏗️ Flujo de Desarrollo](#️-flujo-de-desarrollo)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧪 Testing Strategy](#-testing-strategy)
- [🎨 Arquitectura de Componentes](#-arquitectura-de-componentes)
- [🌐 Internacionalización](#-internacionalización)
- [🔧 Configuraciones](#-configuraciones)
- [🚨 Troubleshooting](#-troubleshooting)
- [📚 Recursos y Contribución](#-recursos-y-contribución)

## 🏥 Características Principales

- **Integración DYAKU**: Sincronización de pacientes vía FHIR R4 con el Padrón Nacional
- **FUA y HIS**: Gestión completa del Formato Único de Atención y reportes HIS
- **Salud Materno-Infantil**: Módulos especializados para Madre Gestante y Niño Sano
- **Indicadores MINSA**: Reportes automatizados para el Ministerio de Salud del Perú
- **Gestión de Pacientes**: Fork mejorado de patient-register y patient-search
- **SIH SALUS Library**: Componentes UI y servicios comunes optimizados para el flujo de trabajo peruano

## 📦 Packages Incluidos

- `@pucp-gidis-hiisc/esm-maternal-and-child-health` - Atención materno-infantil (CRED, Madre Gestante y Afines)
- `@sihsalus/esm-patient-search-app` - Gestión avanzada de búsqueda de pacientes
- `@sihsalus/esm-patient-register-app` - Gestión avanzada de registro de pacientes

## 🚀 Tecnologías

- **OpenMRS 3.x Framework**: Plataforma base de microfrontends
- **React 18+ con TypeScript 5.x**: Framework de interfaz con tipado estático
- **Module Federation**: Arquitectura de microfrontends
- **FHIR R4**: Estándar de interoperabilidad en salud
- **Yarn 4.x**: Gestor de paquetes con workspaces
- **Turbo**: Herramienta de build sistema monorepo
- **Jest**: Framework de testing
- **ESLint + Prettier**: Linting y formateo de código

## ⚙️ Configuración Inicial

### 1. Clonar e Instalar

```bash
# Clonar el repositorio
git clone <repository-url>
cd sihsalus-esm-modules

# Instalar dependencias
yarn install

# Configurar variables de entorno (opcional)
cp example.env .env
```

### 2. Variables de Entorno

Crear `.env` basado en `example.env`:

```bash
# OpenMRS Configuration
OPENMRS_ESM_API_URL=http://localhost:8080/openmrs
OPENMRS_ESM_LOGIN_URL=http://localhost:8080/openmrs/spa/login
OPENMRS_ESM_API_TIMEOUT=60000

# SIH SALUS Specific
SIHSALUS_DYAKU_URL=https://api.dyaku.gob.pe/fhir/R4
SIHSALUS_HIS_URL=https://his.minsa.gob.pe/api/v1
SIHSALUS_MINSA_REPORTS_URL=https://reportes.minsa.gob.pe/api

# Feature Flags
ENABLE_DYAKU_INTEGRATION=true
ENABLE_FUA_MODULE=true
ENABLE_MATERNAL_TRACKING=true
```

## 🛠️ Scripts de Desarrollo

### Resumen de Scripts

| Script | Comando | Descripción | Uso |
|--------|---------|-------------|-----|
| `start` | `yarn start` | Inicia desarrollo OpenMRS | Desarrollo general |
| `verify` | `yarn verify` | Verificación completa (lint + TS + test) | Pre-commit/CI |
| `test-e2e` | `yarn test-e2e` | Tests end-to-end con Playwright | QA completo |
| `ci:publish` | `yarn ci:publish` | Publica a registry de producción | CD Pipeline |
| `ci:prepublish` | `yarn ci:prepublish` | Publica a canal next | CD Pipeline |
| `release` | `yarn release` | Gestión de versiones | Release management |

### Scripts de Desarrollo Principal

#### `yarn start` - Desarrollo con OpenMRS CLI
Inicia el servidor de desarrollo para todos los módulos.

```bash
# Todos los módulos (intensivo en recursos)
yarn start

# Módulo específico
yarn start --sources 'packages/esm-maternal-and-child-health'

# Múltiples módulos específicos
yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-register-app'

# Con configuración específica
yarn start --port 3000 --host localhost
```

#### `yarn verify` - Verificación Completa
Ejecuta linting, TypeScript checking y tests usando Turbo.

```bash
yarn verify
# Equivale a: turbo run lint typescript test --concurrency=1
```

#### `yarn test-e2e` - Tests End-to-End
Ejecuta tests con Playwright.

```bash
yarn test-e2e

# Tests específicos
yarn test-e2e tests/patient-registration.spec.ts

# En modo debug
yarn test-e2e --debug
```

### Scripts de Turbo (Monorepo)

#### Testing
```bash
# Ejecutar todos los tests
yarn turbo test

# Test de paquete específico
yarn turbo test --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health

# Tests con patrón
yarn turbo test --filter=@sihsalus/esm-patient-*

# Tests sin cache
yarn turbo test --force
```

#### Linting y Type Checking
```bash
# Lint todos los paquetes
yarn turbo lint

# Con autofix
yarn turbo lint -- --fix

# Type check todos los paquetes
yarn turbo typescript

# Paquete específico
yarn turbo typescript --filter=@sihsalus/esm-patient-search-app
```

#### Build
```bash
# Build todos los paquetes
yarn turbo build

# Build específico
yarn turbo build --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health

# Con análisis
yarn turbo build --verbose
```

### Scripts por Paquete Individual

Cada paquete incluye estos scripts:

#### Desarrollo
```bash
cd packages/esm-maternal-and-child-health

# Desarrollo con OpenMRS CLI
yarn start

# Servidor webpack standalone
yarn serve

# Alias para serve
yarn debug
```

#### Testing
```bash
# Tests unitarios
yarn test

# Tests en modo watch
yarn test:watch

# Cobertura de tests
yarn coverage
```

#### Build y Análisis
```bash
# Build de producción
yarn build

# Análisis del bundle
yarn analyze
```

#### Calidad de Código
```bash
# ESLint
yarn lint

# Type checking
yarn typescript

# Extraer traducciones
yarn extract-translations
```

## 🏗️ Flujo de Desarrollo

### 1. Desarrollo Local

#### Opción A: Desarrollo de Módulo Específico
```bash
# Para maternal-and-child-health
yarn start --sources 'packages/esm-maternal-and-child-health'

# Para patient modules
yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-register-app'
```

#### Opción B: Desarrollo Completo
```bash
# Todos los módulos (intensivo en recursos)
yarn start
```

#### Opción C: Desarrollo Standalone
```bash
# Navegar al paquete específico
cd packages/esm-maternal-and-child-health

# Usar webpack dev server directamente
yarn serve
```

### 2. Testing Durante Desarrollo

#### Tests Unitarios
```bash
# Ejecutar tests de un paquete específico
yarn turbo test --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health

# Ejecutar todos los tests
yarn turbo test

# Mode watch para desarrollo activo
cd packages/esm-maternal-and-child-health
yarn test:watch
```

#### Verificación de Tipos
```bash
# TypeScript en paquete específico
yarn turbo typescript --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health

# Todos los paquetes
yarn turbo typescript
```

#### Linting
```bash
# Lint de paquete específico
yarn turbo lint --filter=@sihsalus/esm-patient-search-app

# Lint completo
yarn turbo lint
```

### 3. Verificación Completa

Antes de hacer commit o push:
```bash
# Verificación completa (lint + typescript + test)
yarn verify

# Tests E2E (opcional)
yarn test-e2e
```

### 4. Workflow de Contribución

1. **Crear rama de feature**:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Desarrollo**:
   - Trabajar en los archivos necesarios
   - Ejecutar tests en modo watch durante desarrollo
   - Usar `yarn verify` antes de commits

3. **Pre-commit hooks**:
   - Husky ejecutará automáticamente linting y formateo
   - Los archivos se formatearán con Prettier

4. **Testing**:
   ```bash
   # Verificar que todo funciona
   yarn verify
   
   # Tests E2E si es necesario
   yarn test-e2e
   ```

5. **Push y PR**:
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   git push origin feature/nueva-funcionalidad
   ```

### 5. Comandos de Troubleshooting

#### Cache Management
```bash
# Limpiar cache de Turbo
yarn turbo clean

# Limpiar todo (nuclear option)
rm -rf node_modules packages/*/node_modules yarn.lock
yarn install
```

#### Debugging Tests
```bash
# Tests con debugging activo
cd packages/esm-maternal-and-child-health
yarn test --verbose --no-cache --runInBand

# Tests específicos con pattern
yarn test --testNamePattern="should render patient form"
```

#### Debugging Builds
```bash
# Build con verbose output
yarn turbo build --verbose

# Build específico con logs
cd packages/esm-maternal-and-child-health
yarn build --verbose --progress
```

## 📁 Estructura del Proyecto

```
sihsalus-esm-modules/
├── packages/                          # Paquetes del monorepo
│   ├── esm-maternal-and-child-health/ # Módulo materno-infantil
│   │   ├── src/                       # Código fuente
│   │   │   ├── components/            # Componentes React
│   │   │   ├── hooks/                 # Custom hooks
│   │   │   ├── utils/                 # Utilidades
│   │   │   ├── types/                 # Definiciones TypeScript
│   │   │   └── index.ts               # Entry point
│   │   ├── translations/              # Archivos i18n
│   │   ├── webpack.config.js          # Config webpack
│   │   ├── package.json               # Dependencias del paquete
│   │   └── tsconfig.json              # Config TypeScript
│   ├── esm-patient-register-app/      # Registro de pacientes
│   └── esm-patient-search-app/        # Búsqueda de pacientes
├── tools/                             # Herramientas compartidas
│   ├── setup-tests.ts                 # Configuración Jest
│   ├── i18next-parser.config.js       # Config internacionalización
│   └── test-utils.tsx                 # Utilidades de testing
├── e2e/                              # Tests end-to-end
├── jest.config.js                    # Configuración Jest global
├── turbo.json                        # Configuración Turbo
├── playwright.config.ts              # Configuración Playwright
├── package.json                      # Dependencias y scripts root
└── yarn.lock                         # Lock file de dependencias
```

### Estructura de Componente

```
src/
├── components/
│   ├── PatientComponent/
│   │   ├── PatientComponent.tsx       # Componente principal
│   │   ├── PatientComponent.test.tsx  # Tests unitarios
│   │   ├── PatientComponent.scss      # Estilos
│   │   └── index.ts                   # Export
├── hooks/
│   ├── usePatientData.ts              # Custom hook
│   └── usePatientData.test.ts         # Tests del hook
├── utils/
│   ├── patientUtils.ts                # Utilidades
│   └── patientUtils.test.ts           # Tests de utilidades
└── types/
    └── patient.types.ts               # Definiciones TypeScript
```

## 🧪 Testing Strategy

### Tipos de Tests

#### 1. Tests Unitarios
Testean componentes, hooks y utilidades de forma aislada.

```typescript
// Ejemplo de test unitario
import { render, screen } from '@testing-library/react';
import { PatientSearchComponent } from './patient-search.component';

describe('PatientSearchComponent', () => {
  it('should render search input', () => {
    render(<PatientSearchComponent />);
    expect(screen.getByPlaceholderText('Buscar paciente...')).toBeInTheDocument();
  });
});
```

#### 2. Tests de Integración
Testean interacciones entre múltiples componentes.

```typescript
// Ejemplo de test de integración
import { renderWithProviders } from '../../tools/test-utils';
import { PatientRegistrationWorkspace } from './patient-registration.workspace';

describe('PatientRegistrationWorkspace Integration', () => {
  it('should save patient data correctly', async () => {
    const { user } = renderWithProviders(<PatientRegistrationWorkspace />);
    
    await user.type(screen.getByLabelText('Nombres'), 'Juan Carlos');
    await user.click(screen.getByRole('button', { name: 'Guardar' }));
    
    expect(mockSavePatient).toHaveBeenCalledWith(expectedPatientData);
  });
});
```

#### 3. Tests E2E con Playwright
Testean flujos completos de usuario.

```typescript
// e2e/patient-registration.spec.ts
import { test, expect } from '@playwright/test';

test('should register new patient', async ({ page }) => {
  await page.goto('/patient-registration');
  
  await page.fill('[data-testid="patient-name"]', 'María Gonzales');
  await page.fill('[data-testid="patient-dni"]', '12345678');
  await page.click('[data-testid="save-button"]');
  
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

### Best Practices para Testing

#### 1. Naming Conventions
- **Archivos**: `component.test.tsx`, `hook.test.ts`
- **Describe blocks**: Nombre del componente/función siendo testeada
- **Test cases**: Descripción del comportamiento esperado en tercera persona

#### 2. Test Organization
```typescript
describe('PatientComponent', () => {
  beforeEach(() => {
    // Configuración que se ejecuta antes de cada test
  });

  describe('when rendering', () => {
    // Tests relacionados con rendering
  });

  describe('when user interacts', () => {
    // Tests relacionados con interacciones
  });

  describe('when API calls fail', () => {
    // Tests de casos de error
  });
});
```

#### 3. Mocking Strategies
```typescript
// Mock de módulos OpenMRS
jest.mock('@openmrs/esm-framework', () => ({
  useConfig: jest.fn(() => mockConfig),
  openmrsFetch: jest.fn(),
  showNotification: jest.fn(),
}));

// Mock de hooks personalizados
jest.mock('../hooks/usePatientData', () => ({
  usePatientData: jest.fn(() => ({
    data: mockPatientData,
    isLoading: false,
    error: null,
  })),
}));
```

### Comandos de Testing

```bash
# Tests unitarios completos
yarn turbo test

# Tests de paquete específico
yarn turbo test --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health

# Tests en modo watch
cd packages/esm-maternal-and-child-health
yarn test:watch

# Tests con cobertura
yarn coverage

# Tests E2E
yarn test-e2e

# Tests E2E específicos
yarn test-e2e tests/patient-registration.spec.ts
```

## 🎨 Arquitectura de Componentes

### Estructura de Componente OpenMRS

```typescript
// component.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';
import styles from './component.scss';

interface ComponentProps {
  patientUuid?: string;
  // Otras props
}

const Component: React.FC<ComponentProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  
  return (
    <div className={styles.container}>
      <h1>{t('componentTitle', 'Component Title')}</h1>
      {/* Contenido del componente */}
    </div>
  );
};

export default Component;
```

### Hooks Personalizados

```typescript
// hooks/usePatientData.ts
import { useMemo } from 'react';
import useSWR from 'swr';
import { openmrsFetch, fhirBaseUrl } from '@openmrs/esm-framework';

export function usePatientData(patientUuid: string) {
  const { data, error, isLoading } = useSWR(
    patientUuid ? `${fhirBaseUrl}/Patient/${patientUuid}` : null,
    openmrsFetch
  );

  const formattedData = useMemo(() => {
    if (!data) return null;
    
    return {
      // Transformación de datos FHIR a formato de UI
      name: data.name?.[0]?.text,
      birthDate: data.birthDate,
      // ... otros campos
    };
  }, [data]);

  return {
    data: formattedData,
    error,
    isLoading,
  };
}
```

### Gestión de Estado

#### 1. Estado Local con useState/useReducer
```typescript
const [formData, setFormData] = useState<PatientFormData>({
  firstName: '',
  lastName: '',
  birthDate: '',
});
```

#### 2. Estado Global con SWR (Recomendado para datos remotos)
```typescript
const { data: patients, mutate } = useSWR('/ws/rest/v1/patient', fetcher);
```

#### 3. Estado de Configuración
```typescript
const config = useConfig<ModuleConfig>();
```

### Styling Guidelines

#### SCSS Structure
```scss
// component.scss
@import '@openmrs/esm-styleguide/src/vars';
@import '@carbon/react/scss/spacing';

.container {
  padding: $spacing-04;
  background-color: $ui-01;
  
  .header {
    margin-bottom: $spacing-05;
    font-size: $productive-heading-03;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    gap: $spacing-03;
  }
}

// Responsive design
@media (min-width: 768px) {
  .container {
    .content {
      flex-direction: row;
    }
  }
}
```

#### Carbon Design System Integration
```typescript
import {
  Button,
  TextInput,
  Select,
  SelectItem,
  Modal,
} from '@carbon/react';

const FormComponent = () => (
  <div>
    <TextInput
      id="patient-name"
      labelText="Nombre del paciente"
      placeholder="Ingrese el nombre completo"
      invalid={hasError}
      invalidText="Este campo es requerido"
    />
    
    <Button kind="primary" type="submit">
      Guardar Paciente
    </Button>
  </div>
);
```

### Error Handling

#### Error Boundaries
```typescript
// components/ErrorBoundary.tsx
import React from 'react';
import { ErrorState } from '@openmrs/esm-framework';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState error={new Error('Something went wrong')} />;
    }

    return this.props.children;
  }
}
```

#### API Error Handling
```typescript
// utils/errorHandling.ts
import { showNotification } from '@openmrs/esm-framework';

export function handleApiError(error: Error, operation: string) {
  console.error(`Error in ${operation}:`, error);
  
  showNotification({
    title: 'Error',
    kind: 'error',
    description: `Failed to ${operation}. Please try again.`,
  });
}

// Uso en componentes
try {
  await savePatient(patientData);
  showNotification({
    title: 'Success',
    kind: 'success',
    description: 'Patient saved successfully',
  });
} catch (error) {
  handleApiError(error, 'save patient');
}
```

## 🌐 Internacionalización

### Configuración

```javascript
// tools/i18next-parser.config.js
module.exports = {
  createOldCatalogs: false,
  defaultNamespace: 'translation',
  defaultValue: function(lng, ns, key) {
    return key;
  },
  indentation: 2,
  keySeparator: false,
  locales: ['en', 'es'],
  namespaceSeparator: false,
  output: 'translations/$LOCALE.json',
  sort: true,
};
```

### Uso en Componentes

```typescript
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('patientRegistration', 'Registro de Paciente')}</h1>
      <p>{t('fillRequiredFields', 'Complete los campos requeridos')}</p>
    </div>
  );
};
```

### Estructura de Archivos de Traducción

```json
// translations/es.json
{
  "patientRegistration": "Registro de Paciente",
  "fillRequiredFields": "Complete los campos requeridos",
  "savePatient": "Guardar Paciente",
  "searchPlaceholder": "Buscar por nombre, DNI o historia clínica",
  "validationErrors": {
    "required": "Este campo es requerido",
    "invalidDni": "El DNI debe tener 8 dígitos",
    "invalidEmail": "Ingrese un email válido"
  }
}
```

### Comandos de Traducción

```bash
# Extraer strings para traducción (por paquete)
cd packages/esm-maternal-and-child-health
yarn extract-translations

# El comando buscará strings en el código y actualizará los archivos JSON
```

## 🔧 Configuraciones

### Configuraciones Principales

#### 1. Jest Configuration (`jest.config.js`)

```javascript
module.exports = {
  // Entorno de testing
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/../../tools/setup-tests.ts'],
  
  // Module name mapping para assets y frameworks
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@openmrs/esm-framework$': '@openmrs/esm-framework',
  },
  
  // Transformación de archivos
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },
  
  // Configuración de cobertura
  collectCoverageFrom: [
    'packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!packages/*/src/**/*.d.ts',
    '!packages/*/src/**/index.ts',
    '!packages/*/src/**/*.stories.{js,jsx,ts,tsx}',
    '!packages/*/src/**/*.test.{js,jsx,ts,tsx}',
  ],
};
```

**Puntos clave:**
- **jsdom**: Para simular DOM en tests unitarios
- **SWC**: Transpilador rápido para mejor performance
- **Module mapping**: Maneja CSS y dependencias OpenMRS
- **Cobertura**: Configurada para todos los paquetes del monorepo

#### 2. Turbo Configuration (`turbo.json`)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "lib/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "typescript": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

**Características:**
- **Dependency graph**: `^build` indica dependencia de builds upstream
- **Outputs**: Define qué archivos cachear
- **Cache inteligente**: Evita reejecutar tareas innecesarias
- **Paralelización**: Ejecuta tareas en paralelo cuando es posible

#### 3. TypeScript Configuration

##### Root Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "packages/*/src/**/*",
    "tools/**/*"
  ]
}
```

##### Package-Level Configuration
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "./dist",
    "declaration": true,
    "sourceMap": true
  }
}
```

#### 4. Playwright Configuration (`playwright.config.ts`)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  
  webServer: {
    command: 'yarn start',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### 5. ESLint Configuration

```javascript
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

#### 6. Prettier Configuration

```javascript
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
};
```

### Configuraciones de Desarrollo

#### Husky Pre-commit Hooks

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

#### Lint-staged

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --cache --fix --quiet"
    ],
    "*.{css,scss,ts,tsx,json,md}": [
      "prettier --cache --write --list-different"
    ]
  }
}
```

### Variables de Entorno por Ambiente

#### Development (`.env`)
```bash
# OpenMRS Configuration
OPENMRS_ESM_API_URL=http://localhost:8080/openmrs
OPENMRS_ESM_LOGIN_URL=http://localhost:8080/openmrs/spa/login

# SIH SALUS Configuration
SIHSALUS_DYAKU_URL=https://api.dyaku.gob.pe/fhir/R4
SIHSALUS_HIS_URL=https://his.minsa.gob.pe/api/v1

# Feature Flags
ENABLE_DYAKU_INTEGRATION=true
ENABLE_FUA_MODULE=true
ENABLE_MATERNAL_TRACKING=true

# Development
NODE_ENV=development
DEBUG=sihsalus:*
```

#### Production
```bash
# OpenMRS Configuration
OPENMRS_ESM_API_URL=https://prod.sihsalus.gob.pe/openmrs
OPENMRS_ESM_LOGIN_URL=https://prod.sihsalus.gob.pe/openmrs/spa/login

# Security
CORS_ALLOWED_ORIGINS=https://prod.sihsalus.gob.pe
CSP_POLICIES=default-src 'self'

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=info
```

### Webpack Configuration (Por Paquete)

```javascript
// packages/esm-maternal-and-child-health/webpack.config.js
const { ModuleFederationPlugin } = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'swc-loader',
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  
  plugins: [
    new ModuleFederationPlugin({
      name: 'maternalAndChildHealth',
      filename: 'remoteEntry.js',
      exposes: {
        './startupApp': './src/index.ts',
      },
      shared: {
        '@openmrs/esm-framework': { singleton: true },
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
};
```

## � Troubleshooting

### Problemas Comunes

#### 1. Tests Fallando
```bash
# Limpiar cache de Jest
yarn jest --clearCache

# Verificar configuración de Jest
yarn turbo test --filter=paquete-especifico --force

# Tests con debugging activo
cd packages/esm-maternal-and-child-health
yarn test --verbose --no-cache --runInBand

# Tests específicos con pattern
yarn test --testNamePattern="should render patient form"
```

#### 2. Errores de TypeScript con Zod
- Asegurar que se usa TypeScript 5.x
- Verificar compatibilidad de versiones de Zod
- Reinstalar dependencias si persiste el error

#### 3. Problemas de Dependencias
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules yarn.lock
yarn install

# Actualizar dependencias core de OpenMRS
yarn up openmrs @openmrs/esm-framework
git checkout package.json  # No commitear versiones específicas
yarn

# Reset completo (nuclear option)
rm -rf node_modules packages/*/node_modules yarn.lock
yarn install
```

#### 4. Problemas de Build
```bash
# Limpiar cache de Turbo
yarn turbo clean

# Build específico con verbose
yarn turbo build --filter=paquete-especifico --verbose

# Build con logs detallados
cd packages/esm-maternal-and-child-health
yarn build --verbose --progress

# Análisis de bundle
yarn analyze
```

#### 5. Problemas de Desarrollo Local
```bash
# Si yarn start falla
yarn turbo clean
rm -rf node_modules yarn.lock
yarn install
yarn start

# Para módulo específico
yarn start --sources 'packages/esm-maternal-and-child-health' --port 3001

# Desarrollo standalone
cd packages/esm-maternal-and-child-health
yarn serve
```

#### 6. Problemas de Cache
```bash
# Limpiar cache de Turbo
yarn turbo clean

# Ver estadísticas de cache
yarn turbo run build --dry-run

# Forzar ejecución sin cache
yarn turbo build --force
```

### Debug de Módulos Específicos

#### Maternal and Child Health
```bash
cd packages/esm-maternal-and-child-health

# Desarrollo standalone
yarn serve

# Tests en watch mode
yarn test:watch

# Build con análisis
yarn analyze
```

#### Patient Modules
```bash
# Desarrollo conjunto
yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-register-app'

# Tests específicos
yarn turbo test --filter=@sihsalus/esm-patient-*
```

### Comandos de Diagnóstico

#### Estado del Proyecto
```bash
# Información de workspaces
yarn workspaces list

# Verificar dependencias
yarn why <package-name>

# Estado de git (si hay problemas de merge)
git status
git clean -fdx  # CUIDADO: elimina archivos no trackeados
```

#### Verificación de Configuración
```bash
# Verificar configuración de Jest
yarn jest --showConfig

# Verificar configuración de TypeScript
yarn tsc --showConfig

# Verificar configuración de Turbo
cat turbo.json
```

### Logs y Debugging

#### Habilitar Logs Detallados
```bash
# Desarrollo con logs
DEBUG=sihsalus:* yarn start

# Tests con logs verbose
yarn turbo test --verbose

# Build con timing
time yarn turbo build
```

#### VS Code Debugging
Si usas VS Code, puedes usar la configuración de debug incluida:

```json
// .vscode/launch.json (ya incluido)
{
  "name": "Debug Jest Tests",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"]
}
```

### CI/CD Troubleshooting

#### Simular CI Localmente
```bash
# Simular CI completo
yarn verify && yarn test-e2e

# Con timing como en CI
time yarn verify

# Con reportes
yarn verify --reporter=verbose
```

#### Problemas de Deployment
```bash
# Verificar build de producción
NODE_ENV=production yarn turbo build

# Tests en modo CI
CI=true yarn test-e2e

# Dry run de release
yarn release --dry-run
```

### Checklist de Debugging

Cuando encuentres un problema, sigue este checklist:

1. **¿Es un problema de cache?**
   ```bash
   yarn turbo clean
   ```

2. **¿Son las dependencias?**
   ```bash
   rm -rf node_modules yarn.lock && yarn install
   ```

3. **¿Es configuración de TypeScript?**
   ```bash
   yarn turbo typescript --verbose
   ```

4. **¿Es configuración de Jest?**
   ```bash
   yarn jest --clearCache && yarn turbo test --force
   ```

5. **¿Es un problema de red/API?**
   - Verificar variables de entorno
   - Verificar conectividad a APIs externas

6. **¿Es un problema de versiones?**
   ```bash
   yarn why @openmrs/esm-framework
   ```

## �📚 Recursos y Contribución

### Recursos Adicionales

- [OpenMRS 3.x Documentation](http://o3-dev.docs.openmrs.org)
- [Yarn Workspaces](https://yarnpkg.com/features/workspaces)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Carbon Design System](https://carbondesignsystem.com/)
- [Jest Testing Framework](https://jestjs.io/)
- [Playwright E2E Testing](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Documentación Específica SIH SALUS

- **DYAKU Integration**: Documentación de integración con Padrón Nacional
- **FUA Module**: Formato Único de Atención - workflows y validaciones
- **MINSA Reports**: Reportes automatizados según directrices MINSA
- **Maternal Health**: Flujos específicos de atención materno-infantil

### Contribución

#### Proceso de Contribución

1. **Fork del proyecto**
2. **Crear rama de feature** (`git checkout -b feature/AmazingFeature`)
3. **Desarrollo con tests**
4. **Commit con conventional commits** (`git commit -m 'feat: Add some AmazingFeature'`)
5. **Push a la rama** (`git push origin feature/AmazingFeature`)
6. **Abrir Pull Request**

#### Estándares de Código

- **TypeScript**: Tipado estricto obligatorio
- **ESLint**: Configuración extendida de OpenMRS
- **Prettier**: Formateo automático en pre-commit
- **Conventional Commits**: Para automatic versioning
- **Tests**: Cobertura mínima recomendada del 80%
- **Documentación**: Componentes y hooks deben estar documentados

#### Checklist Pre-PR

- [ ] `yarn verify` pasa sin errores
- [ ] Tests tienen cobertura adecuada (mínimo 80%)
- [ ] Código está documentado apropiadamente
- [ ] No hay console.logs o comentarios TODO
- [ ] Translations están actualizadas si hay cambios de UI
- [ ] Screenshots incluidos si hay cambios visuales
- [ ] Descripción de PR es clara y completa

#### Review Guidelines

- **Code Review**: Al menos 1 reviewer aprobado
- **QA Review**: Tests E2E pasan en environment de staging
- **Security Review**: Para cambios que afecten autenticación/autorización
- **Performance Review**: Para cambios que afecten carga de datos o rendering

### CI/CD Pipeline

#### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Run verification
        run: yarn verify
      
      - name: Run E2E tests
        run: yarn test-e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build packages
        run: yarn turbo build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: packages/*/dist
```

#### Deployment Strategy

- **Development**: Automatic deployment on `develop` branch
- **Staging**: Automatic deployment on PRs to `main`
- **Production**: Manual deployment after merge to `main`

#### Versioning Strategy

- **Semantic Versioning**: MAJOR.MINOR.PATCH
- **Conventional Commits**: Para automatic versioning
- **Changesets**: Para managing releases en monorepo

### Contacto y Soporte

Para preguntas, issues o contribuciones:

- **Issues**: Usar GitHub Issues con templates apropiados
- **Discussions**: Para preguntas generales de desarrollo
- **Security**: Para vulnerabilidades de seguridad, contactar directamente al equipo

### Scripts de Utilidad

#### Scripts Personalizados Recomendados

```bash
# Agregar a .bashrc o .zshrc
alias salus-start="yarn start"
alias salus-test="yarn turbo test"
alias salus-verify="yarn verify"
alias salus-build="yarn turbo build"
alias salus-clean="yarn turbo clean && rm -rf node_modules yarn.lock && yarn install"

# Scripts específicos por módulo
alias maternal-dev="yarn start --sources 'packages/esm-maternal-and-child-health'"
alias patient-dev="yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-register-app'"
```

#### VS Code Configuration

Se incluyen configuraciones optimizadas para VS Code:

- **`.vscode/settings.json`**: Configuración del editor
- **`.vscode/extensions.json`**: Extensiones recomendadas
- **`.vscode/tasks.json`**: Tareas predefinidas
- **`.vscode/launch.json`**: Configuración de debugging

---

Este README.md es el punto único de referencia para todo el desarrollo en el monorepo SIH SALUS ESM Modules. Se actualiza regularmente conforme el proyecto evoluciona.
