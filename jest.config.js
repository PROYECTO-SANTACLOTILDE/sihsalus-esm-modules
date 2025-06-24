module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tools/setup-tests.ts'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@sihsalus/esm-sihsalus-library$': '<rootDir>/packages/esm-sihsalus-library/src',
    '^@openmrs/esm-framework$': '@openmrs/esm-framework',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },
  transformIgnorePatterns: [
    'node_modules/(?!((@openmrs|@carbon|@babel|dayjs)/.*|lodash-es|d3|internmap|delaunator|robust-predicates))',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  collectCoverageFrom: [
    'packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!packages/*/src/**/*.d.ts',
    '!packages/*/src/**/index.ts',
    '!packages/*/src/**/*.stories.{js,jsx,ts,tsx}',
    '!packages/*/src/**/*.test.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/packages/*/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/*/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
  globals: {
    System: {},
  },
};
