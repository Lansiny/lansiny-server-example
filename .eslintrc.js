module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:node/recommended',
    'plugin:promise/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'space-before-function-paren': ['off'],
    'array-callback-return': ['off'],
    'no-unused-vars': ['warn'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'node/no-unsupported-features/es-syntax': ['off'],
    'node/no-unpublished-require': ['off'],
    'no-process-exit': ['off'],
    'no-console': ['warn']
  }
}
