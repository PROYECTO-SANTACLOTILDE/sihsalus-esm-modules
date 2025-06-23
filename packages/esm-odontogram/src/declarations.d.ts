declare module '*.css';
declare module '*.scss';
declare type SpaBase = string;

declare global {
  interface Window {
    spaBase: SpaBase;
    getOpenmrsSpaBase(): SpaBase;
  }
}
