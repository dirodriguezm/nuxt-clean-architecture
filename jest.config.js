module.exports = {
  moduleNameMapper: {
    '^@@/(?!node_modules)(.*)$': '<rootDir>/$1',
    '^~~/(?!node_modules)(.*)$': '<rootDir>/src/$1',
    '^@modules/(.*)': '<rootDir>/src/modules/$1',
    '^@shared/(.*)': '<rootDir>/src/shared/$1',
    '^@ui/(.*)': '<rootDir>/src/ui/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  testRegex: '(/__tests__/.spec.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  collectCoverageFrom: [
    '<rootDir>/src/ui/components/**/*.vue',
    '<rootDir>/src/ui/pages/**/*.vue',
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/*.types.ts',
    '!<rootDir>/src/app/**/*.mock.ts',
  ],
}
