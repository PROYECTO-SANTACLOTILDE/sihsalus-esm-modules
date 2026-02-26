<div align="center">
  <h1>SIH SALUS ESM Modules</h1>
  <p><strong>Sistema Integral de Salud - Enterprise Scale Micro Frontends</strong></p>
  
  [![Node.js Version](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
  [![Yarn Workspaces](https://img.shields.io/badge/Yarn%20Workspaces-4%2B-2C8EBB?style=flat-square&logo=yarn)](https://classic.yarnpkg.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=flat-square&logo=react)](https://react.dev/)
  [![Turbo](https://img.shields.io/badge/Turbo-Build%20System-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/)
  
  [![OpenMRS](https://img.shields.io/badge/OpenMRS-3.x-0084C6?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+)](https://openmrs.org/)
  [![Carbon Design System](https://img.shields.io/badge/Carbon%20Design-System-F1C40F?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+)](https://carbondesignsystem.com/)
  [![Jest](https://img.shields.io/badge/Jest-Coverage-C21325?style=flat-square&logo=jest)](https://jestjs.io/)
  [![Playwright](https://img.shields.io/badge/Playwright-E2E%20Tests-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)
</div>

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Módulos](#módulos)
- [Inicio Rápido](#inicio-rápido)
- [Comandos Principales](#comandos-principales)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Troubleshooting](#troubleshooting)
- [Recursos](#recursos)
- [Contribución](#contribución)

---

## Descripción

**SIH SALUS ESM Modules** es una colección de módulos microfrontend diseñados para **SIH SALUS**, una distribución especializada de OpenMRS 3.x perfectamente adaptada al ecosistema de salud peruano y a las directrices del Ministerio de Salud (MINSA). 

Este proyecto implementa arquitectura de **Module Federation** con múltiples aplicaciones independientes que funcionan en un único SPA (Single Page Application), permitiendo desarrollo escalable, despliegue independiente y mantenimiento eficiente.

## Características

<table>
<tr>
<td>

### Integración DYAKU
Sincronización automática de pacientes vía FHIR R4 con el Padrón Nacional de Identificación

</td>
<td>

### FUA y HIS
Gestión completa del Formato Único de Atención y reportes HIS normalizados

</td>
</tr>
<tr>
<td>

### Salud Materno-Infantil
Módulos especializados para CRED, Madre Gestante y seguimiento continuo

</td>
<td>

### Indicadores MINSA
Reportes automatizados según directrices del Ministerio de Salud Peruano

</td>
</tr>
<tr>
<td>

### Consulta Externa
Gestión de atenciones ambulatorias, triaje y seguimiento de consultas

</td>
<td>

### Vacunaciones
Esquemas de inmunización, calendario de vacunas y registro de dosis

</td>
</tr>
</table>

## 📦 Módulos

| Módulo                                           | Descripción                                       | Estado   |
| ------------------------------------------------ | ------------------------------------------------- | -------- |
| <nobr>🤰 **esm-maternal-and-child-health**</nobr> | Atención materno-infantil (CRED + Madre Gestante) | ✅ Activo |
| 📄 **esm-fua-app**                                | Formato Único de Atención (FUA)                   | ✅ Activo |
| 🏨 **esm-consulta-externa-app**                   | Gestión de consulta externa                       | ✅ Activo |
| 💉 **esm-vacunacion-app**                         | Inmunizaciones y esquemas de vacunación           | ✅ Activo |
| 🔗 **esm-dyaku-app**                              | Integración DYAKU (Padrón Nacional FHIR R4)       | ✅ Activo |
| 📊 **esm-indicadores-app**                        | Indicadores clínicos y epidemiológicos MINSA      | ✅ Activo |
| 💰 **esm-estructura-costos-app**                  | Estructura y análisis de costos                   | ✅ Activo |

## ⚙️ Inicio Rápido

### 📋 Requisitos Previos

- **Node.js**: v18 o superior
- **Yarn**: v3.6+ (Package Manager)
- **Git**: v2.30+
- **OpenMRS**: Servidor backend (local o remoto)

### 1️⃣ Instalar Dependencias

```bash
# Clonar el repositorio
git clone https://github.com/PROYECTO-SANTACLOTILDE/sihsalus-esm-modules.git
cd sihsalus-esm-modules

# Instalar todas las dependencias (Yarn Workspaces)
yarn install
```

### 2️⃣ Configurar Backend

Edita o crea `spa-build-config.json` en la raíz del proyecto:

```json
{
  "apiUrl": "https://tu-servidor.com",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

**Descripción de campos:**

| Campo     | Descripción                      | Ejemplo                       |
| --------- | -------------------------------- | ----------------------------- |
| `apiUrl`  | URL del servidor backend OpenMRS | `http://localhost:8080`       |
| `spaPath` | Ruta donde se sirve la SPA       | `/openmrs/spa`                |
| `env`     | Ambiente de ejecución            | `development` \| `production` |
| `offline` | Habilitar modo offline           | `true` \| `false`             |

### 3️⃣ Iniciar Desarrollo

```bash
# Iniciar todos los módulos
yarn start

# Iniciar módulo específico
yarn start --sources packages/esm-maternal-and-child-health

# Con backend personalizado
yarn start --backend https://tu-servidor.com/openmrs
```

⏳ **La aplicación estará disponible en:** `http://localhost:8080/openmrs/spa`

## 🛠️ Comandos Principales

### 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo (todos los módulos)
yarn start

# Módulo específico en modo watch
yarn start --sources packages/esm-dyaku-app

# Múltiples módulos simultáneamente
yarn start --sources packages/esm-fua-app --sources packages/esm-consulta-externa-app

# Con hot reload habilitado
yarn dev
```

### ✅ Testing

```bash
# Ejecutar tests unitarios de todos los módulos
yarn turbo test

# Tests con cobertura de código
yarn turbo test -- --coverage

# Tests de módulo específico
yarn turbo test --filter=@pucp-gidis-hiisc/esm-maternal-and-child-health-app

# Tests en modo watch (observa cambios)
cd packages/esm-maternal-and-child-health
yarn test:watch

# Tests E2E (end-to-end)
yarn test-e2e

# Tests E2E en interfaz visual
yarn test-e2e --ui
```

### 📦 Build & Release

```bash
# Build de todos los módulos
yarn turbo build

# Build de módulo específico
yarn turbo build --filter=@pucp-gidis-hiisc/esm-dyaku-app

# Build con análisis de tamaño
yarn turbo build -- --analyze

# Incrementar versión patch (1.0.0 -> 1.0.1)
yarn release:patch

# Incrementar versión minor (1.0.0 -> 1.1.0)
yarn release:minor

# Incrementar versión major (1.0.0 -> 2.0.0)
yarn release:major
```

### 🔍 Verificación de Código

```bash
# Lint, TypeScript y Tests (verificación completa)
yarn verify

# Linting con corrección automática
yarn turbo lint -- --fix

# Type checking estricto
yarn turbo typescript

# Formatear código con Prettier
yarn turbo format
```

### 🧹 Mantenimiento

```bash
# Limpiar caché de Turbo
yarn turbo clean

# Limpiar caché de Jest
yarn jest --clearCache

# Listar dependencias del workspace
yarn workspaces list
```

## 🔧 Configuración

### 📄 spa-build-config.json

Archivo de configuración para el desarrollo local. Define el backend de OpenMRS a usar:

```json
{
  "apiUrl": "https://hii1sc-dev.inf.pucp.edu.pe",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

#### 🌍 Configuraciones de Ambiente

**Local (desarrollo):**
```json
{
  "apiUrl": "http://localhost:8080",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

**Servidor de pruebas (QA):**
```json
{
  "apiUrl": "https://qa-server.example.com",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": false
}
```

**Producción:**
```json
{
  "apiUrl": "https://prod-server.example.com",
  "spaPath": "/openmrs/spa",
  "env": "production",
  "offline": false
}
```

**Modo offline (sin conexión):**
```json
{
  "apiUrl": "http://localhost:8080",
  "spaPath": "/openmrs/spa",
  "env": "development",
  "offline": true
}
```

## 🏗️ Estructura del Proyecto

```
sihsalus-esm-modules/
├── packages/
│   ├── esm-maternal-and-child-health/    # 👶 CRED + Madre Gestante
│   ├── esm-fua-app/                      # 📄 Formato Único de Atención
│   ├── esm-consulta-externa-app/         # 🏨 Consulta externa
│   ├── esm-vacunacion-app/               # 💉 Inmunizaciones
│   ├── esm-dyaku-app/                    # 🔗 Integración DYAKU
│   ├── esm-indicadores-app/              # 📊 Indicadores MINSA
│   └── esm-estructura-costos-app/        # 💰 Estructura de costos
├── e2e/                                  # 🧪 Tests end-to-end (Playwright)
├── tools/                                # 🛠️ Utilidades compartidas
│   ├── test-utils.tsx                    # Utilidades de testing
│   ├── setup-tests.ts                    # Configuración Jest
│   └── i18next-parser.config.js          # Parser i18n
├── __mocks__/                            # 📦 Mocks globales
├── spa-build-config.json                 # ⚙️ Configuración del backend
├── turbo.json                            # 🚀 Configuración Turbo
├── tsconfig.json                         # TypeScript config
├── package.json                          # 📋 Dependencias raíz
├── jest.config.js                        # Jest config
├── playwright.config.ts                  # Playwright config
└── yarn.lock                             # 🔒 Lock file
```

### 🛠️ Stack Tecnológico

| Área                | Tecnología                   | Versión      |
| ------------------- | ---------------------------- | ------------ |
| **Package Manager** | Yarn Workspaces + Turbo      | 4.x / latest |
| **Framework**       | OpenMRS 3.x                  | 3.x          |
| **UI**              | React + Single-SPA           | 18.x         |
| **Design System**   | Carbon Design System         | latest       |
| **Lenguaje**        | TypeScript                   | 5.x          |
| **Testing**         | Jest + React Testing Library | latest       |
| **E2E Testing**     | Playwright                   | latest       |
| **Build**           | Webpack + Module Federation  | 5.x          |
| **Linting**         | ESLint + Prettier            | latest       |
| **i18n**            | react-i18next                | latest       |

## 🚨 Troubleshooting

### 🔴 Limpiar Caché y Reinstalar

```bash
# Opción 1: Limpieza completa (recomendado)
rm -rf node_modules packages/*/node_modules yarn.lock
yarn install

# Opción 2: Solo caché de Turbo
yarn turbo clean

# Opción 3: Solo caché de Jest
yarn jest --clearCache

# Opción 4: Limpieza profunda
yarn turbo clean && rm -rf node_modules && yarn install
```

### 🔴 Problemas de Build

```bash
# Build con logs detallados
yarn turbo build --verbose

# Build forzado sin caché
yarn turbo build --force

# Build de un módulo específico
yarn turbo build --filter=esm-fua-app --verbose
```

### 🔴 Problemas de Conexión al Backend

**Checklist:**
- ✅ Verificar que `spa-build-config.json` tiene la URL correcta
- ✅ Verificar que el servidor backend está corriendo
- ✅ Verificar configuración de CORS en el servidor
- ✅ Verificar firewall y permisos de red

```bash
# Test de conexión
curl -v https://tu-servidor.com/openmrs/ws/rest/v1/session

# Con autenticación básica
curl -u usuario:contraseña https://tu-servidor.com/openmrs/ws/rest/v1/session
```

### 🔴 Errores de Dependencias

```bash
# Actualizar dependencias de OpenMRS al latest
yarn upgrade @openmrs/esm-framework@next
yarn upgrade @openmrs/esm-patient-common-lib@next

# Verificar integridad de dependencias
yarn install --check-files

# Mostrar dependencias duplicadas
yarn dedupe --check
```

### 🔴 Tests Fallando

```bash
# Limpiar caché de Jest
yarn jest --clearCache

# Ejecutar tests con debug mode
DEBUG=* yarn test

# Tests con logs verbosos
yarn turbo test -- --verbose --no-cache

# Tests de un módulo específico
cd packages/esm-maternal-and-child-health
yarn test --verbose --no-cache
```

### 🔴 Puertos ya en Uso

```bash
# Linux/Mac: Encontrar proceso en puerto 8080
lsof -i :8080

# Windows: Encontrar proceso en puerto 8080
netstat -ano | findstr :8080

# Matar proceso (Linux/Mac)
kill -9 <PID>

# Usar puerto diferente
yarn start -- --port 3000
```

### 🔴 Errores de TypeScript

```bash
# Type checking completo
yarn turbo typescript

# Limpiar caché de TypeScript
yarn turbo typescript -- --deleteCache

# Type checking en módulo específico
yarn turbo typescript --filter=esm-fua-app
```

## 📚 Recursos

### 📖 Documentación Oficial

- [OpenMRS 3.x Documentation](http://o3-dev.docs.openmrs.org) - Documentación principal de OpenMRS
- [Carbon Design System](https://carbondesignsystem.com/) - Componentes y guías de diseño
- [Turbo Documentation](https://turbo.build/repo/docs) - Guía de Turbo monorepo
- [Module Federation](https://webpack.js.org/concepts/module-federation/) - Webpack Module Federation

### 🎓 Recursos de Aprendizaje

- [React Documentation](https://react.dev) - Documentación oficial de React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guía completa de TypeScript
- [Jest Testing](https://jestjs.io/docs/getting-started) - Testing con Jest
- [Playwright Testing](https://playwright.dev/docs/intro) - E2E Testing con Playwright
- [ESLint Documentation](https://eslint.org/docs/latest/) - Linting y mejores prácticas

### 🏥 Recursos de Salud (Perú)

- [MINSA - Ministerio de Salud](https://www.gob.pe/minsa) - Normativas y directrices
- [OpenMRS Community](https://openmrs.org/) - Comunidad global de OpenMRS
- [FHIR R4 Specification](https://www.hl7.org/fhir/) - Estándar internacional de datos de salud

## 🤝 Contribución

Te agradecemos tu interés en contribuir a SIH SALUS. Aquí te mostramos cómo hacerlo:

### 📋 Proceso de Contribución

1. **Fork** el proyecto desde GitHub
2. **Crear rama feature** siguiendo la convención: `git checkout -b feature/nueva-funcionalidad`
3. **Realizar cambios** y asegurar que todos los tests pasen
4. **Commit** con mensajes descriptivos: `git commit -m 'feat: agregar nueva funcionalidad'`
5. **Push** a tu rama: `git push origin feature/nueva-funcionalidad`
6. **Abrir Pull Request** con descripción detallada de los cambios

### ✨ Estándares de Código

```
✅ TypeScript estricto (sin 'any' types)
✅ Tests para nuevas funcionalidades (mínimo 80% cobertura)
✅ Conventional Commits (feat:, fix:, docs:, etc.)
✅ ESLint + Prettier (ejecutar `yarn turbo lint -- --fix`)
✅ Documentación actualizada (README, comments)
✅ No breaking changes sin coordinación previa
```

### 🧪 Antes de hacer Push

```bash
# 1. Ejecutar verificación completa
yarn verify

# 2. Limpiar código
yarn turbo lint -- --fix
yarn turbo format

# 3. Ejecutar tests locales
yarn turbo test

# 4. Ejecutar tests E2E
yarn test-e2e

# 5. Build completo
yarn turbo build
```

### 📝 Guía de Commits

Usamos **Conventional Commits** para mantener un historial limpio:

```
feat: agregar nueva funcionalidad
fix: corregir bug en módulo X
docs: actualizar documentación
style: cambios de formato (no afectan funcionalidad)
refactor: reorganizar código
perf: mejora de rendimiento
test: agregar o actualizar tests
chore: cambios en dependencias o configuración
```

**Ejemplo:**
```bash
git commit -m "feat(esm-fua-app): agregar validación de formato FUA"
git commit -m "fix(esm-maternal-and-child-health): resolver error en cálculo CRED"
git commit -m "docs: mejorar sección de troubleshooting"
```

### 🔄 Pull Request Template

Por favor, incluir:

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix (cambio no disruptivo que soluciona un issue)
- [ ] Nueva funcionalidad (cambio no disruptivo que agrega funcionalidad)
- [ ] Breaking change (cambio que causa incompatibilidad)
- [ ] Documentación

## Testing
Describe cómo se han probado los cambios:
- [ ] Tests unitarios agregados/actualizados
- [ ] Tests E2E verificados
- [ ] Manual testing completado

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He ejecutado `yarn verify` exitosamente
- [ ] He agregado/actualizado tests
- [ ] La documentación está actualizada
```

---

## 🙋 Soporte

¿Tienes preguntas o necesitas ayuda?

- 📧 Abre un [Issue](https://github.com/PROYECTO-SANTACLOTILDE/sihsalus-esm-modules/issues)
- 💬 Participa en [Discussions](https://github.com/PROYECTO-SANTACLOTILDE/sihsalus-esm-modules/discussions)
- 📚 Consulta la [Wiki](https://github.com/PROYECTO-SANTACLOTILDE/sihsalus-esm-modules/wiki)

---

<div align="center">

### ⭐ Si te ha sido útil este proyecto, no olvides darle una estrella en GitHub ⭐

**Hecho con ❤️ para la salud pública del Perú**

**[↑ Volver arriba](#-tabla-de-contenidos)**

</div>
