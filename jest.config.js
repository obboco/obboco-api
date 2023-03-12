module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testRunner: 'jest-jasmine2',
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  setupFilesAfterEnv: ['<rootDir>/test/hooks.ts'],
  roots: ['<rootDir>/test'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testTimeout: 30000,
};
