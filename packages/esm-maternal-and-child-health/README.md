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
- `@sihsalus/esm-fua-his-integration` - Manejo de FUA e integración HIS
- `@sihsalus/esm-maternal-child-health` - Atención materno-infantil
- `@sihsalus/esm-patient-management-peru` - Gestión avanzada de pacientes
- `@sihsalus/esm-reports-minsa` - Reportes oficiales MINSA
- `@sihsalus/esm-shared-library` - Componentes y servicios compartidos

## 🚀 Tecnologías

- OpenMRS 3.x Framework
- React 18+ con TypeScript
- Module Federation
- FHIR R4 estándar
- Lerna + Yarn Workspaces

## Ejecución local

```sh
yarn        # Instala las dependencias
yarn start  # Inicia el servidor de desarrollo
```

Una vez iniciado, se abrirá una ventana del navegador con la aplicación OpenMRS 3. Inicia sesión y navega a `/openmrs/spa/root`.

## Personalización

1. Reemplaza todas las instancias de "template" por el nombre de tu microfrontend.
2. Actualiza `index.ts` cambiando el nombre de la funcionalidad, la página y la ruta.
3. Renombra los archivos `root.*` usando el nombre de tu primera página.
4. Borra el contenido de los objetos en `config-schema` y complétalos según tus necesidades.
5. Elimina los directorios `greeter` y `patient-getter`, y el contenido de `root.component.tsx`.
6. Borra el contenido de `translations/en.json`.
7. Adapta los flujos de trabajo en `.github/workflows` según tu caso. Si tu microfrontend será gestionado por la comunidad, reemplaza "template" por el nombre de tu microfrontend. Si es para una organización específica, configura GitHub Actions según tus requerimientos.
8. Finalmente, reemplaza este README con una breve explicación de tu proyecto y, si es posible, enlaza documentos de planificación o diseño.

Ahora puedes comenzar a desarrollar tu primera página como una aplicación React.

Ejemplo de microfrontend: [Medication dispensing app](https://github.com/openmrs/openmrs-esm-dispensing-app).

## Integración

Para integrar tu microfrontend, revisa la guía [Crear un módulo frontend](https://o3-docs.openmrs.org/docs/recipes/create-a-frontend-module).
