import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';

export interface DyakuNavLinkProps {}

const DyakuNavLink: React.FC<DyakuNavLinkProps> = () => {
  return <ConfigurableLink to="/dyaku">Dyaku Integration</ConfigurableLink>;
};

export default DyakuNavLink;
