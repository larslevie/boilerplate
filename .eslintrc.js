module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  rules: {
    'max-len': ['error', { code: 80 }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['webpack.*.*js'] },
    ],
  },
};
