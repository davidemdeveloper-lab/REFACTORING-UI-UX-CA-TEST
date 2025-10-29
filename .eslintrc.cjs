module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['next', 'next/core-web-vitals', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
    'react/react-in-jsx-scope': 'off'
  }
};
