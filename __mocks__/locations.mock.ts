import { type Location } from '@openmrs/esm-framework';

export const mockLocation: Location = {
  uuid: 'some-uuid1',
  name: 'Test Location',
  display: 'Test Location',
};

export const mockLocations = {
  data: {
    results: [mockLocation],
  },
};
