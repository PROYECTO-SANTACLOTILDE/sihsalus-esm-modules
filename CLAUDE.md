# CLAUDE.md - SIH SALUS ESM Modules

## 📋 Overview

This document serves as the comprehensive guide for working with the **SIH SALUS ESM Modules** - a specialized collection of OpenMRS 3.x microfrontends adapted for the Peruvian healthcare ecosystem and MINSA guidelines.

## 🏗️ Project Architecture

### Core Technologies
- **OpenMRS 3.x Framework**: Base microfrontend platform
- **React 18+ with TypeScript 5.x**: UI framework with static typing
- **Module Federation**: Microfrontend architecture
- **FHIR R4**: Healthcare interoperability standard
- **Yarn 4.x with Workspaces**: Package management
- **Turbo**: Monorepo build system
- **Jest + Playwright**: Testing framework
- **ESLint + Prettier**: Code quality tools

### Project Structure
```
sihsalus-esm-modules/
├── packages/                    # ESM modules
│   ├── esm-billing-app/        # Billing and payment management
│   ├── esm-dyaku-app/          # DYAKU integration (FHIR R4)
│   ├── esm-fua-app/            # FUA and HIS management
│   ├── esm-maternal-and-child-health/  # Maternal and child care
│   ├── esm-patient-immunizations-app/  # Immunization tracking
│   ├── esm-patient-registration-app/   # Patient registration
│   ├── esm-patient-search-app/         # Advanced patient search
│   └── esm-sihsalus-widgets-app/       # Shared UI components
├── tools/                      # Build and development tools
├── __mocks__/                  # Test mocks
└── translations/               # i18n resources
```

## 🚀 Development Workflow

### 1. Initial Setup
```bash
# Clone and install
git clone <repository-url>
cd sihsalus-esm-modules
yarn install

# Configure environment
cp example.env .env
```

### 2. Development Commands

#### Start Development Server
```bash
# All modules (resource intensive)
yarn start

# Specific module
yarn start --sources 'packages/esm-maternal-and-child-health'

# Multiple specific modules
yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-registration-app'
```

#### Testing
```bash
# Unit tests
yarn turbo test

# E2E tests
yarn test-e2e

# Specific package tests
yarn turbo test --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health
```

#### Code Quality
```bash
# Full verification (lint + typescript + test)
yarn verify

# Linting
yarn turbo lint

# Type checking
yarn turbo typescript
```

### 3. Package-Specific Development
```bash
# Navigate to specific package
cd packages/esm-maternal-and-child-health

# Development with OpenMRS CLI
yarn start

# Standalone webpack dev server
yarn serve

# Tests in watch mode
yarn test:watch
```

## 📦 Module Descriptions

### Core Healthcare Modules

#### `esm-maternal-and-child-health`
- **Purpose**: Maternal and child care (CRED, Pregnant Mother, etc.)
- **Key Features**:
  - Growth charts and development tracking
  - Immunization planning
  - Obstetric history management
  - Well-child care workflows
- **Key Files**:
  - `src/maternal-and-child-health/` - Main components
  - `src/ui/growth-chart/` - Growth visualization
  - `src/immunization-plan/` - Immunization management

#### `esm-patient-search-app`
- **Purpose**: Advanced patient search and management
- **Key Features**:
  - Compact search interface
  - Advanced filtering
  - Patient overlay management
- **Key Files**:
  - `src/compact-patient-search/` - Search components
  - `src/patient-search-page/` - Full search page

#### `esm-patient-registration-app`
- **Purpose**: Patient registration and management
- **Key Features**:
  - Patient creation workflows
  - Registration forms
  - Patient linking
- **Key Files**:
  - `src/patient-registration/` - Registration components
  - `src/widgets/` - Registration widgets

### Integration Modules

#### `esm-dyaku-app`
- **Purpose**: DYAKU integration via FHIR R4
- **Key Features**:
  - Patient synchronization with National Registry
  - FHIR R4 compliance
  - Data validation
- **Key Files**:
  - `src/dyaku-patients/` - Patient sync components

#### `esm-fua-app`
- **Purpose**: FUA (Formato Único de Atención) and HIS management
- **Key Features**:
  - Case management
  - HIS reporting
  - Request tracking
- **Key Files**:
  - `src/fua/` - FUA components
  - `src/hooks/useFuaRequests.ts` - Data management

### Support Modules

#### `esm-billing-app`
- **Purpose**: Billing and payment management
- **Key Features**:
  - Bill creation and management
  - Payment processing
  - Invoice generation
- **Key Files**:
  - `src/billing-form/` - Billing forms
  - `src/invoice/` - Invoice components

#### `esm-sihsalus-widgets-app`
- **Purpose**: Shared UI components and utilities
- **Key Features**:
  - Reusable components
  - Common hooks
  - Utility functions
- **Key Files**:
  - `src/ui/` - UI components
  - `src/hooks/` - Shared hooks

## 🧪 Testing Strategy

### Unit Testing
- **Framework**: Jest with React Testing Library
- **Location**: `__tests__/` directories in each package
- **Coverage**: Aim for >80% coverage
- **Mocking**: Comprehensive mocks in `__mocks__/`

### E2E Testing
- **Framework**: Playwright
- **Configuration**: `playwright.config.ts`
- **Tests**: `tests/` directory
- **Coverage**: Critical user workflows

### Testing Commands
```bash
# Unit tests
yarn turbo test

# E2E tests
yarn test-e2e

# Coverage report
yarn turbo test --coverage

# Watch mode
yarn turbo test --watch
```

## 🌐 Internationalization (i18n)

### Translation Structure
- **Framework**: i18next with react-i18next
- **Location**: `translations/` in each package
- **Languages**: Spanish (es), English (en), Arabic (ar), Amharic (am)
- **Extraction**: `yarn extract-translations`

### Translation Workflow
```bash
# Extract new translations
yarn extract-translations

# Add new language
# 1. Create new file: translations/xx.json
# 2. Add to i18next configuration
# 3. Update language selector
```

## 🔧 Configuration Management

### Environment Variables
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

### Module Configuration
Each module has a `config-schema.ts` file defining:
- Required configuration parameters
- Default values
- Validation rules
- Feature flags

## 📚 Key Development Patterns

### 1. Component Architecture
```typescript
// Standard component structure
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';

interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const config = useConfig();
  
  // Component logic
  
  return (
    // JSX
  );
};
```

### 2. Hook Patterns
```typescript
// Custom hooks for data management
export const usePatientData = (patientId: string) => {
  const { data, error, mutate } = useSWR(
    patientId ? `/ws/rest/v1/patient/${patientId}` : null,
    openmrsFetch
  );
  
  return {
    patient: data?.data,
    isLoading: !data && !error,
    error,
    mutate
  };
};
```

### 3. Resource Management
```typescript
// API resource patterns
export const patientResource = {
  get: (uuid: string) => openmrsFetch(`/ws/rest/v1/patient/${uuid}`),
  create: (patient: Patient) => openmrsFetch('/ws/rest/v1/patient', {
    method: 'POST',
    body: patient
  }),
  update: (uuid: string, patient: Patient) => openmrsFetch(`/ws/rest/v1/patient/${uuid}`, {
    method: 'POST',
    body: patient
  })
};
```

## 🚨 Common Issues and Solutions

### 1. Module Federation Issues
```bash
# Clear module cache
rm -rf node_modules/.cache
yarn start --clear-cache

# Rebuild all modules
yarn turbo build --force
```

### 2. TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache/typescript
yarn turbo typescript --force
```

### 3. Translation Issues
```bash
# Regenerate translation files
yarn extract-translations
yarn build
```

### 4. Build Issues
```bash
# Clean build
rm -rf packages/*/dist
yarn turbo build --force
```

## 📖 Best Practices

### 1. Code Organization
- Keep components small and focused
- Use TypeScript interfaces for all props
- Implement proper error boundaries
- Follow OpenMRS naming conventions

### 2. Performance
- Use React.memo for expensive components
- Implement proper loading states
- Optimize bundle size with code splitting
- Use SWR for data fetching and caching

### 3. Testing
- Write tests for all new features
- Mock external dependencies
- Test error scenarios
- Maintain high test coverage

### 4. Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

## 🔄 Release Process

### Version Management
```bash
# Patch release
yarn release:patch

# Minor release
yarn release:minor

# Major release
yarn release:major
```

### Publishing
```bash
# Publish to production
yarn ci:publish

# Publish to next channel
yarn ci:prepublish
```

## 📞 Support and Resources

### Documentation
- [OpenMRS 3.x Documentation](https://openmrs.github.io/openmrs-esm-core/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community
- [OpenMRS Talk](https://talk.openmrs.org/)
- [GitHub Issues](https://github.com/PROYECTO-SANTACLOTILDE/sihsalus-esm-modules/issues)

### Development Tools
- **IDE**: VS Code with OpenMRS extensions
- **Debugging**: React DevTools, Redux DevTools
- **API Testing**: Postman, Insomnia
- **Performance**: Lighthouse, Bundle Analyzer

---

**Remember**: This is a healthcare application. Always prioritize data accuracy, security, and user safety in your development work. 