const tsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.delete('@')
    config.resolve
      .plugin('tsconfig-paths')
      .use(tsconfigPathsWebpackPlugin)
  }
}