/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  setupFiles: ['<rootDir>/tests/set-env-vars.js'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        sourcemap: true,
        loaders: {
          '.spec.ts': 'tsx',
        },
      },
    ],
  },
  // TODO: Aumentar coverage
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 70,
      lines: 90,
      statements: 85,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  modulePathIgnorePatterns: ['<rootDir>/.build/'],
  moduleNameMapper: {
    '~/constants/(.*)': '<rootDir>/src/constants/$1',
    '~/models/(.*)': '<rootDir>/src/models/$1',
    '~/repositories/(.*)': '<rootDir>/src/repositories/$1',
    '~/services/(.*)': '<rootDir>/src/services/$1',
    '~/use-cases/(.*)': '<rootDir>/src/use-cases/$1',
    '~/adapters/(.*)': '<rootDir>/src/adapters/$1',
    '~/utils/(.*)': '<rootDir>/src/utils/$1',
  },
}
