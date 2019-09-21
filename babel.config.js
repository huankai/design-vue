module.exports = {
  presets: [['@vue/app', {
    polyfills: ['es6.symbol', 'es6.promise', 'es6.array.find-index', 'es7.array.includes', 'es6.string.includes', 'es6.array.find']
  }]],
  plugins: [
    [
      "import",
      {libraryName: "ant-design-vue", libraryDirectory: "es", style: true}
    ]
  ]
};
