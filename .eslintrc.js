module.exports = {
  root: true,
  env: {
    // browser: true,
    es6: true,
    node: true,
  },
  extends: [
    // 'standard',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'linebreak-style': ['warn', 'unix'],
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'nowarn',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
