module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "@enums/(.*)": ["<rootDir>/src/@core/enums/$1"],
        "@utils/(.*)": ["<rootDir>/src/@core/utils/$1"],
    },
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
