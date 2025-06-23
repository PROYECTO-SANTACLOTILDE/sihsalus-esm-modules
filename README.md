![Node.js CI](https://github.com/sihsalus/openmrs-esm-sihsalus-modules/workflows/Node.js%20CI/badge.svg)

# SIH SALUS ESM Modules

Colección de módulos microfrontend para SIH SALUS, una distribución especializada de OpenMRS 3.x adaptada al ecosistema de salud peruano y las directrices del MINSA.

## 🏥 Características Principales

- **Integración DYAKU**: Sincronización de pacientes vía FHIR R4 con el Padrón Nacional
- **FUA y HIS**: Gestión completa del Formato Único de Atención y reportes HIS
- **Salud Materno-Infantil**: Módulos especializados para Madre Gestante y Niño Sano
- **Indicadores MINSA**: Reportes automatizados para el Ministerio de Salud del Perú
- **Gestión de Pacientes**: Fork mejorado de patient-register y patient-search
- **SIH SALUS Library**: Componentes UI y servicios comunes optimizados para el flujo de trabajo peruano

## 📦 Packages Incluidos

- `@sihsalus/esm-dyaku-integration` - Integración con DYAKU FHIR y Padrón Nacional
- `@sihsalus/esm-odontogram` - Odontograma
- `@sihsalus/esm-fua-his-integration` - Manejo de FUA e integración HIS
- `@sihsalus/esm-maternal-and-child-health` - Atención materno-infantil (CRED, Madre Gestante y Afines)
- `@sihsalus/esm-patient-search-app` - Gestión avanzada de pacientes
- `@sihsalus/esm-patient-register-app` - Gestión avanzada de pacientes
- `@sihsalus/esm-reports-minsa` - Reportes oficiales MINSA
- `@sihsalus/esm-sihsalus-library` - Componentes y servicios compartidos

## 🚀 Tecnologías

- OpenMRS 3.x Framework
- React 18+ con TypeScript
- Module Federation
- FHIR R4 (Implementación)
- Yarn

## Setup

Check out the developer documentation [here](http://o3-dev.docs.openmrs.org).

This monorepo uses [yarn](https://yarnpkg.com).

To install the dependancies, run:
```bash
yarn install
```

To set up environment variables for the project, follow these steps:

1. Create a copy of the .env.example file by running the following command:
  ```bash
  cp example.env .env
  ```
2. Open the newly created .env file in the root of the project.
3. Add the environment variables you need. 

Note: These variables are currently only used for end-to-end tests.

To start a dev server running all the modules simultaneously, run:

```bash
yarn start
```

This command uses the [openmrs](https://www.npmjs.com/package/openmrs) tooling to fire up a dev server running `esm-patient-chart` as well as the specified module.

Note that this is very resource-intensive.

To start a dev server for a specific module, run:

```bash
yarn start --sources 'packages/esm-<insert-package-name>-app'
```

You could provide `yarn start` with as many `sources` arguments as you require. For example, to run the patient registration and patient search modules only, use:

```bash
yarn start --sources 'packages/esm-patient-search-app' --sources 'packages/esm-patient-registration-app'
```

## Troubleshooting

If you notice that your local version of the application is not working or that there's a mismatch between what you see locally versus what's in the reference application, you likely have outdated versions of core libraries. To update core libraries, run the following commands:

```bash
# Upgrade core libraries
yarn up openmrs @openmrs/esm-framework

# Reset version specifiers to `next`. Don't commit actual version numbers.
git checkout package.json

# Run `yarn` to recreate the lockfile
yarn
```