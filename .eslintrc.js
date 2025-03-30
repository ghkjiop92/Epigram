module.exports = {
    env: {
      browser: true,
      node: true,
      jest: true, // ✅ jest 글로벌 변수 허용
    },
    extends: ['airbnb-base', 'prettier'],
    rules: {
      'max-depth': ['error', 2],
      'max-params': ['error', 3],
      'max-lines-per-function': ['error', { max: 10 }]
    },
  };
  