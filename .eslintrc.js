module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['lib/*'],
  rules: {
    'prettier/prettier': 0,
    'indent': [2, 2, { 'SwitchCase': 1 }],
    'semi': [2, 'never'],
    'comma-dangle': [2, 'always-multiline'],
    'no-unused-vars': 2,
    'no-trailing-spaces': 2,
    'object-curly-spacing': [2, 'always'],
    'no-spaced-func': 2,
    'space-before-function-paren': [2, {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always',
    }],
    'generator-star-spacing': [2, { 'before': false, 'after': true }],
  },
}
