module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.datamuse.com/',
        pathRewrite: { '^/api': '/' }
      }
    }
  }
}
