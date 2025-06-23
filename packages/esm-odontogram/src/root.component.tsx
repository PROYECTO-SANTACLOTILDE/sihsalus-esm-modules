import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OdontogramPage from './odontogram/odontogram-page.component';

const Root: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/odontogram`}>
      <Routes>
        <Route path="/" element={<OdontogramPage />} />
        <Route path="/patient/:patientUuid" element={<OdontogramPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
