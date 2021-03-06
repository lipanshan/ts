module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-last': 'off',
    'space-before-function-paren': 'off',
    'no-trailing-spaces': 'off',
    "no-tabs": 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
