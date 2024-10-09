const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });
const customJestConfig = {
    testEnvironment: 'jsdom',
    verbose: true,
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

module.exports = createJestConfig(customJestConfig);
