module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"],
};
