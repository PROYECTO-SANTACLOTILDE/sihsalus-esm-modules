# @sihsalus/esm-odontogram

Módulo de odontograma para SIH SALUS ESM - Sistema especializado para registros dentales.

## Descripción

Este módulo proporciona funcionalidades completas de odontograma dental para el sistema SIH SALUS, incluyendo:

- Interfaz visual de odontograma interactivo
- Registro de condiciones dentales
- Historial de tratamientos
- Integración con FHIR R4
- Soporte para diferentes sistemas de notación dental (FDI, Universal, Palmer)

## Características

- **Odontograma Visual**: Interfaz gráfica interactiva para marcar condiciones dentales
- **Sistemas de Notación**: Soporte para FDI, Universal y Palmer
- **Historial Completo**: Registro cronológico de tratamientos y condiciones
- **Integración FHIR**: Compatible con estándares FHIR R4 para interoperabilidad
- **Guardado Automático**: Funcionalidad de auto-guardado configurable

## Instalación

```bash
yarn add @sihsalus/esm-odontogram
```

## Configuración

El módulo puede configurarse a través del esquema de configuración:

```json
{
  "@sihsalus/esm-odontogram": {
    "enableAdvancedOdontogram": true,
    "defaultTeethNotation": "FDI",
    "autoSaveInterval": 30000
  }
}
```

## Desarrollo

### Scripts disponibles

- `yarn start` - Inicia el servidor de desarrollo
- `yarn build` - Construye el módulo para producción
- `yarn test` - Ejecuta las pruebas
- `yarn lint` - Ejecuta el linter
- `yarn extract-translations` - Extrae strings de traducción

### Estructura del proyecto

```
src/
├── odontogram/           # Componentes principales del odontograma
├── config-schema.ts      # Esquema de configuración
├── index.ts             # Punto de entrada del módulo
└── translations/        # Archivos de traducción
```

## Uso

El módulo se integra automáticamente en el sistema OpenMRS 3.x cuando está instalado. Los usuarios pueden acceder al odontograma desde el menú principal de navegación.

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Licencia

MPL-2.0
