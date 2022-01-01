module.exports = {
  collectCoverageFrom: [
    'src/**',
  ],
  testEnvironment: 'jsdom',
  verbose: false,
  setupFiles: [
    '<rootDir>/setupTests.ts',
  ],
};
