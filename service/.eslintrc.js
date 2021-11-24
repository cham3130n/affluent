module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    ecmaVersion: 12,
    sourceType: 'module'
  },
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'src/**/*.js', '*.json', 'src/**/*.spec.ts'],
  rules: {
    'class-methods-use-this': 'off',
    'id-length': 'off',
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-await-in-loop': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-unsafe-optional-chaining': 'off',
    '@typescript-eslint/class-methods-use-this': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
