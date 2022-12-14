module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'default-param-last': 0,
    'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
    'max-len': 0,
    'no-unsafe-optional-chaining': 0,
    'no-use-before-define': 0,
    'no-nested-ternary': 0,
    'consistent-return': 0,
    'array-callback-return': 0,
  },
};
