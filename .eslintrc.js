/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,

  env: {
    browser: true,
    node: false
  },

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'react-app', 'prettier'],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-extra-non-null-assertion': 'off',
    '@typescript-eslint/no-extra-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn'
  }
};

module.exports = eslintConfig;
