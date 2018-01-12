module.exports = {
  plugins: [
    'react'
  ],
  extends: ['standard'],
  parser: 'babel-eslint',
  env: {
    'es6': true,
    'browser': true,
    'node': true
  },
  rules: {
    // 箭头函数没有返回值
    'no-return-assign': 0,
    // react component引用 no-unused-vars
    "react/jsx-uses-vars": 2
  },
  globals: {
    React: true,
    FastClick: true,
    i18n: true
  }
}