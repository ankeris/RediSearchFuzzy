module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "@enums/(.*)": ["<rootDir>/src/@core/enums/$1"],
    },
};
