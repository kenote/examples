// Jest Configuration ...
module.exports = {
  collectCoverage: true,
  // rootDir: 'tests',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'vue',
    'json',
    'node'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ]
}