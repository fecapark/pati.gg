module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],

  ignorePatterns: ['.next', '.vscode', 'node_modules', '.eslintrc.cjs'],

  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-dom'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
