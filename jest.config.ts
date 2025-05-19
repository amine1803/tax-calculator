import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(scss|css)$": "identity-obj-proxy",
        "^@icons/(.*)\\.svg\\?react$": "<rootDir>/src/__mocks__/svg-mock.js",
        "^@icons/(.*)$": "<rootDir>/src/assets/icons/$1",
        "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { useESM: true, tsconfig: "<rootDir>/tsconfig.spec.json" }],
    },
};

export default config;
