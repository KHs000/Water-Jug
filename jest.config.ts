export default {
    preset: "ts-jest",
    silent: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    modulePathIgnorePatterns: ["src/server.ts"],
}