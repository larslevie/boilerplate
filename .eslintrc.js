module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  rules: {
    'arrow-parens': 0,
    'max-len': [
      'warn',
      {
        code: 80,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['webpack.*.*js'] },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'object-curly-newline': 0,
  },
};
