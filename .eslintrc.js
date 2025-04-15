module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['next/core-web-vitals'],
  rules: {
    'max-depth': ['error', 2],
    'max-params': ['error', 3],
    'max-lines-per-function': 'off',
  },
};
