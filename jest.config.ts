export default {
	preset: "ts-jest",
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1", // Mapeia o alias @ para a pasta src
	},
};
