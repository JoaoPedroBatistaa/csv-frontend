module.exports = {
   preset: "ts-jest",
   testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
   testEnvironment: "jsdom",
   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
   moduleFileExtensions: ["js", "jsx", "ts", "tsx"]
}
