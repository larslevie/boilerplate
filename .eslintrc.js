module.exports = {
  env: {
    browser: true
  },
  extends: "airbnb",
  rules: {
    "arrow-parens": [0],
    "max-len": ["error", { code: 80 }],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["webpack.*.*js"] }
    ]
  }
};
