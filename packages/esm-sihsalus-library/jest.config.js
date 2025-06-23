/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },
  transformIgnorePatterns: ['/node_modules/(?!@openmrs)'],
  moduleNameMapping: {
    '\\.(s?css)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^lodash-es/(.*)$': 'lodash/$1',
    '^uuid$': require.resolve('uuid'),
  },
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageReporters: ['json-summary', 'lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  roots: ['<rootDir>/src/'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx)', '<rootDir>/src/**/?(*.)(test|spec).(ts|tsx)'],
};
