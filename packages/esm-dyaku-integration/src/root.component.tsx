import React from 'react';

export interface RootComponentProps {}

const RootComponent: React.FC<RootComponentProps> = () => {
  return (
    <div>
      <h1>Dyaku Integration</h1>
      <p>Este es el componente raíz para la integración con Dyaku.</p>
    </div>
  );
};

export default RootComponent;
