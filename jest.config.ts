const esModules = ['@middy'].join('|')

export default {
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '~/constants/(.*)': '<rootDir>/src/constants/$1',
    '~/models/(.*)': '<rootDir>/src/models/$1',
    '~/repositories/(.*)': '<rootDir>/src/repositories/$1',
    '~/services/(.*)': '<rootDir>/src/services/$1',
    '~/use-cases/(.*)': '<rootDir>/src/use-cases/$1',
    '~/utils/(.*)': '<rootDir>/src/utils/$1',
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFiles: ['<rootDir>/set-env-vars.js'],
}
