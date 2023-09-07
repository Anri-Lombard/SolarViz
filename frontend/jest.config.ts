import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Test environment
  clearMocks: true, // Automatically clear mock calls, instances, contexts, and results before every test
  collectCoverage: true, // Indicates whether the coverage information should be collected while executing the test
  coverageDirectory: 'coverage', // The directory where Jest should output its coverage files
  coverageProvider: 'v8', // Indicates which provider should be used to instrument code for coverage
  moduleFileExtensions: [
    'js',
    'ts', // Add TypeScript file extension
    'tsx', // Add TypeScript JSX file extension
    'json',
    'node',
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)', // Match test files with .ts and .tsx extensions
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for transforming TypeScript files
  },
};

export default config;
