# SIH SALUS ESM Modules

Colección de módulos microfrontend para SIH SALUS, una distribución especializada de OpenMRS 3.x adaptada al ecosistema de salud peruano y las directrices del MINSA.

## 📋 Tabla de Contenidos

- [🏥 Características](#-características)
- [📦 Módulos](#-módulos)
- [⚙️ Inicio Rápido](#️-inicio-rápido)
- [🛠️ Comandos Principales](#️-comandos-principales)
- [🔧 Configuración](#-configuración)
- [🚨 Troubleshooting](#-troubleshooting)

## 🏥 Características

- **Integración DYAKU**: Sincronización de pacientes vía FHIR R4 con el Padrón Nacional
- **FUA y HIS**: Gestión completa del Formato Único de Atención y reportes HIS
- **Salud Materno-Infantil**: Módulos especializados para CRED, Madre Gestante y seguimiento
- **Indicadores MINSA**: Reportes automatizados según directrices del Ministerio de Salud
- **Gestión de Pacientes**: Registro y búsqueda avanzada de pacientes

## 📦 Módulos

- `esm-maternal-and-child-health` - Atención materno-infantil (CRED + Madre Gestante)
- `esm-fua-app` - Formato Único de Atención
- `esm-consulta-externa-app` - Consulta externa
- `esm-vacunacion-app` - Inmunizaciones
- `esm-dyaku-app` - Integración DYAKU (Padrón Nacional FHIR R4)
- `esm-indicadores-app` - Indicadores clínicos MINSA
- `esm-estructura-costos-app` - Estructura de costos

## ⚙️ Inicio Rápido

### 1. Instalar dependencias

```bash
yarn install
```

### 2. Configurar backend

Edita `spa-build-config.json` con la URL de tu servidor OpenMRS:

```json
{
  "apiUrl": "https://tu-servidor.com",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

**Campos:**
- `apiUrl`: URL del servidor backend OpenMRS
- `spaPath`: Ruta donde se sirve la SPA
- `env`: Ambiente (`development` | `production`)
- `offline`: Habilitar modo offline

### 3. Iniciar desarrollo

```bash
# Todos los módulos
yarn start

# Módulo específico
yarn start --sources packages/esm-maternal-and-child-health

# Con backend personalizado
yarn start --backend https://tu-servidor.com/openmrs
```

## 🛠️ Comandos Principales

### Desarrollo

```bash
# Iniciar servidor de desarrollo
yarn start

# Módulo específico
yarn start --sources packages/esm-dyaku-app

# Múltiples módulos
yarn start --sources packages/esm-fua-app --sources packages/esm-consulta-externa-app
```

### Testing

```bash
# Tests unitarios de todos los módulos
yarn turbo test

# Tests de módulo específico
yarn turbo test --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health-app

# Tests en modo watch
cd packages/esm-maternal-and-child-health
yarn test:watch

# Tests E2E
yarn test-e2e
```

### Build

```bash
# Build de todos los módulos
yarn turbo build

# Build de módulo específico
yarn turbo build --filter=@pucp-gidis-hiisc/esm-dyaku-app
```

### Verificación

```bash
# Lint, TypeScript y Tests
yarn verify

# Lint con corrección automática
yarn turbo lint -- --fix

# Type checking
yarn turbo typescript
```

### Release

```bash
# Incrementar versión patch (1.0.0 -> 1.0.1)
yarn release:patch

# Incrementar versión minor (1.0.0 -> 1.1.0)
yarn release:minor

# Incrementar versión major (1.0.0 -> 2.0.0)
yarn release:major
```

## 🔧 Configuración

### spa-build-config.json

Archivo de configuración para el desarrollo local. Define el backend de OpenMRS a usar:

```json
{
  "apiUrl": "https://hii1sc-dev.inf.pucp.edu.pe",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

**Ambientes comunes:**

**Desarrollo local:**
```json
{
  "apiUrl": "http://localhost:8080",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

**Servidor de pruebas:**
```json
{
  "apiUrl": "https://test-server.example.com",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

**Modo offline:**
```json
{
  "apiUrl": "http://localhost:8080",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": true
}
```

### Estructura del Proyecto

```
sihsalus-esm-modules/
├── packages/
│   ├── esm-maternal-and-child-health/  # CRED + Madre Gestante
│   ├── esm-fua-app/                    # Formato Único de Atención
│   ├── esm-consulta-externa-app/       # Consulta externa
│   ├── esm-vacunacion-app/             # Inmunizaciones
│   ├── esm-dyaku-app/                  # Integración DYAKU
│   ├── esm-indicadores-app/            # Indicadores MINSA
│   └── esm-estructura-costos-app/      # Estructura de costos
├── tools/                              # Test utils, i18n config, scripts
├── spa-build-config.json               # Configuración del backend
├── turbo.json                          # Configuración Turbo
├── package.json                        # Dependencias raíz
└── yarn.lock                           # Lock file
```

### Tecnologías

- **Monorepo**: Yarn Workspaces + Turbo
- **Framework**: OpenMRS 3.x (React + Single-SPA)
- **UI**: Carbon Design System
- **Testing**: Jest + React Testing Library + Playwright
- **Build**: Webpack + Module Federation
- **Linting**: ESLint + Prettier
- **TypeScript**: 5.x

## 🚨 Troubleshooting

### Limpiar caché y reinstalar

```bash
# Limpiar todo y reinstalar
rm -rf node_modules packages/*/node_modules yarn.lock
yarn install

# Limpiar solo caché de Turbo
yarn turbo clean
```

### Problemas de build

```bash
# Build con logs detallados
yarn turbo build --verbose

# Forzar build sin caché
yarn turbo build --force
```

### Problemas de conexión al backend

1. Verificar que `spa-build-config.json` tiene la URL correcta
2. Verificar que el servidor backend está corriendo
3. Verificar configuración de CORS en el servidor

```bash
# Test de conexión
curl -I https://tu-servidor.com/openmrs/ws/rest/v1/session
```

### Errores de dependencias

```bash
# Actualizar dependencias de OpenMRS
yarn up @openmrs/esm-framework@next
yarn up @openmrs/esm-patient-common-lib@next

# Reinstalar dependencias
yarn install
```

### Tests fallando

```bash
# Limpiar caché de Jest
yarn jest --clearCache

# Ejecutar tests con debug
cd packages/esm-maternal-and-child-health
yarn test --verbose --no-cache
```

## 📚 Recursos

- [OpenMRS 3.x Documentation](http://o3-dev.docs.openmrs.org)
- [Carbon Design System](https://carbondesignsystem.com/)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

### Estándares

- TypeScript estricto
- Tests para nuevas funcionalidades
- Conventional Commits
- ESLint + Prettier
