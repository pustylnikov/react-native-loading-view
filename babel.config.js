module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@anvilapp/react-native-loading-view': './src',
        },
        cwd: 'babelrc',
      },
    ],
  ],
}
