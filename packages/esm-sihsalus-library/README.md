# @sihsalus/esm-sihsalus-library

Biblioteca de componentes y servicios compartidos para los módulos SIH SALUS ESM.

## Descripción

Esta biblioteca contiene componentes UI reutilizables, hooks personalizados, utilidades y tipos TypeScript que son compartidos entre todos los módulos del monorepo SIH SALUS ESM.

## Estructura

```
src/
├── components/     # Componentes UI reutilizables
├── hooks/         # Custom hooks de React
├── utils/         # Funciones utilitarias
├── types/         # Tipos TypeScript compartidos
└── index.ts       # Exports principales
```

## Instalación

```bash
yarn add @sihsalus/esm-sihsalus-library
```

## Uso

```typescript
import { 
  // Componentes
  SomeSharedComponent,
  
  // Hooks
  useSomeSharedHook,
  
  // Utils
  someUtilFunction,
  
  // Types
  SomeSharedType
} from '@sihsalus/esm-sihsalus-library';
```

## Desarrollo

### Scripts disponibles

- `yarn build` - Compila la biblioteca
- `yarn dev` - Modo de desarrollo con watch
- `yarn test` - Ejecuta las pruebas
- `yarn test:watch` - Ejecuta las pruebas en modo watch
- `yarn lint` - Ejecuta el linter
- `yarn lint:fix` - Corrige automáticamente errores de linting

### Contribuir

1. Agregar nuevos componentes en `src/components/`
2. Agregar nuevos hooks en `src/hooks/`
3. Agregar nuevas utilidades en `src/utils/`
4. Agregar nuevos tipos en `src/types/`
5. Exportar desde los archivos `index.ts` correspondientes

## Licencia

MPL-2.0
