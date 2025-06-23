import '@testing-library/jest-dom';

// Mock OpenMRS framework
const mockFramework = {
  openmrsObservable: jest.fn(),
  openmrsFetch: jest.fn(),
  createGlobalStore: jest.fn(),
  getGlobalStore: jest.fn(),
  subscribeTo: jest.fn(),
  showNotification: jest.fn(),
  showToast: jest.fn(),
  navigate: jest.fn(),
  interpolateUrl: jest.fn(),
  interpolateString: jest.fn(),
  formatDate: jest.fn(),
  formatTime: jest.fn(),
  formatDatetime: jest.fn(),
  parseDate: jest.fn(),
  toDateObjectStrict: jest.fn(),
  toOmrsIsoString: jest.fn(),
  isOmrsDateStrict: jest.fn(),
  today: jest.fn(),
  age: jest.fn(),
  daysIntoYear: jest.fn(),
  isOmrsDateToday: jest.fn(),
  validator: jest.fn(),
  validators: {},
  userHasAccess: jest.fn(),
  getAsyncLifecycle: jest.fn(),
  getSyncLifecycle: jest.fn(),
  defineConfigSchema: jest.fn(),
  provide: jest.fn(),
  getConfig: jest.fn(),
  getCurrentUser: jest.fn(() => ({
    uuid: 'test-user-uuid',
    display: 'Test User',
  })),
  getSessionLocation: jest.fn(() => ({
    uuid: 'test-location-uuid',
    display: 'Test Location',
  })),
  useConfig: jest.fn(),
  useSession: jest.fn(() => ({
    user: {
      uuid: 'test-user-uuid',
      display: 'Test User',
    },
    sessionLocation: {
      uuid: 'test-location-uuid',
      display: 'Test Location',
    },
  })),
  useLayoutType: jest.fn(() => 'desktop'),
  usePagination: jest.fn(),
  useLocations: jest.fn(() => ({ locations: [] })),
  usePatient: jest.fn(),
  useVisit: jest.fn(),
  useVisits: jest.fn(),
  useConnectivity: jest.fn(() => true),
  useConnectedExtensions: jest.fn(() => []),
  useExtensionSlotMeta: jest.fn(),
  useOnClickOutside: jest.fn(),
  useForceUpdate: jest.fn(),
  useBodyScrollLock: jest.fn(),
  useDebounce: jest.fn(),
  useFeatureFlag: jest.fn(),
  Extension: jest.fn(({ children }) => children),
  ExtensionSlot: jest.fn(({ children }) => children),
  ConfigurableLink: jest.fn(({ children }) => children),
  UserHasAccess: jest.fn(({ children }) => children),
  BreadcrumbsContainer: jest.fn(({ children }) => children),
  LeftNavMenu: jest.fn(({ children }) => children),
  SideNav: jest.fn(({ children }) => children),
  Navbar: jest.fn(({ children }) => children),
  PatientBannerPatientInfo: jest.fn(({ children }) => children),
  PatientBannerContactDetails: jest.fn(({ children }) => children),
  PatientBannerToggleContactDetailsButton: jest.fn(({ children }) => children),
  PatientPhoto: jest.fn(({ children }) => children),
  PatientBannerActionsMenu: jest.fn(({ children }) => children),
  setCurrentVisit: jest.fn(),
  newWorkspaceItem: jest.fn(),
  getWorkspaceStore: jest.fn(),
  useWorkspaces: jest.fn(),
  closeWorkspace: jest.fn(),
  launchWorkspace: jest.fn(),
  WorkspaceContainer: jest.fn(({ children }) => children),
  isDesktop: jest.fn(),
  isTablet: jest.fn(),
  useCurrentPatient: jest.fn(),
  fhirBaseUrl: '/ws/fhir2/R4',
  restBaseUrl: '/ws/rest/v1',
  getLoggedInUser: jest.fn(),
  refetchCurrentUser: jest.fn(),
  logout: jest.fn(),
  setSessionLocation: jest.fn(),
  clearCurrentPatient: jest.fn(),
  navigate: jest.fn(),
  interpolateUrl: jest.fn((template, params) => {
    let result = template;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        result = result.replace(`\${${key}}`, value);
      });
    }
    return result;
  }),
};

// Mock the framework module
jest.mock('@openmrs/esm-framework', () => mockFramework);

// Setup global mocks
global.System = {
  import: jest.fn(),
};

global.getOpenmrsSpaBase = jest.fn(() => '/openmrs/spa/');

// Mock window.location
delete window.location;
window.location = {
  assign: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  href: 'http://localhost/',
  origin: 'http://localhost',
  pathname: '/',
  search: '',
  hash: '',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  protocol: 'http:',
  ancestorOrigins: {},
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Suppress console errors for tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
