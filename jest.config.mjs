import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/*.test.{ts,tsx}",
    "!jest.setup.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};

export default createJestConfig(customJestConfig);
