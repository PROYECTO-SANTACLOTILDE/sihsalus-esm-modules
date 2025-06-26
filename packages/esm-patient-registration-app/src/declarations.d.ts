declare module '@carbon/react';
declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.svg';
declare type SideNavProps = {};

// Temporary type declarations for missing dependencies
declare module 'formik' {
  export const Field: any;
  export const Form: any;
  export const Formik: any;
  export const FieldArray: any;
  export function useField<T = any>(name: string): any;
  export const useFormikContext: any;
  export type FormikHelpers<T> = any;
}

declare module 'yup/lib/locale' {
  const _default: any;
  export = _default;
}

declare module '@openmrs/esm-service-queues-app/src/types' {
  export type LocationEntry = any;
  export type LocationResponse = any;
}
