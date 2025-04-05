// eslint-disable-next-line no-undef
module.exports = {
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
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  setupFiles: ['<rootDir>/set-env-vars.js'],
  modulePathIgnorePatterns: ['<rootDir>/.build/'],
  moduleNameMapper: {
    '~/constants/(.*)': '<rootDir>/src/constants/$1',
    '~/models/(.*)': '<rootDir>/src/models/$1',
    '~/repositories/(.*)': '<rootDir>/src/repositories/$1',
    '~/services/(.*)': '<rootDir>/src/services/$1',
    '~/use-cases/(.*)': '<rootDir>/src/use-cases/$1',
    '~/utils/(.*)': '<rootDir>/src/utils/$1',
  },
}
