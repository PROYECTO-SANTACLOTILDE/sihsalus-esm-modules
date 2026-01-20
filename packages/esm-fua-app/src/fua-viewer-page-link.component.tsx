import { ConfigurableLink } from '@openmrs/esm-framework';

export default function FuaViewerPageLink() {
  return null;
}

export function createFuaViewerPageLink() {
  return () =>
    ConfigurableLink({
      to: '${openmrsSpaBase}/fua-viewer',
      children: 'Visor de FUA (Demo)',
    });
}
