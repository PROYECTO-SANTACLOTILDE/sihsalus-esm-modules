import { type Patient } from '@openmrs/esm-framework';

export const mockPatient: Patient = {
  resourceType: 'Patient',
  id: '8673ee4f-e2ab-4077-ba55-4980f408773e',
  identifier: [
    {
      use: 'usual',
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'MR',
          },
        ],
      },
      value: '10000X',
    },
  ],
  active: true,
  name: [
    {
      use: 'official',
      family: 'Wilson',
      given: ['John'],
    },
  ],
  gender: 'male',
  birthDate: '1972-04-04',
  deceasedBoolean: false,
  address: [
    {
      use: 'home',
      city: 'Test City',
      state: 'Test State',
      postalCode: '12345',
      country: 'Test Country',
    },
  ],
};
