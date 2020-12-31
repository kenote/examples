const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const tsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')

const env = process.env.NODE_ENV || 'production'
const entryPath = path.resolve(process.cwd(), 'server')
const buildPath = path.resolve(process.cwd(), 'dist')

const config = {
  mode: env === 'development' ? 'development' : 'production',
  target: 'node',
  devtool: 'source-map',
  externals: [
    nodeExternals({
      modulesFromFile: true,
      allowlist: [
        /^(lodash|validator|dayjs)/,
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|less|styl)$/,
      ],
    })
  ],
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    plugins: [
      new tsconfigPathsWebpackPlugin({
        configFile: 'server/tsconfig.json'
      })
    ]
  },
  resolveLoader: {

  },
  node: {
    __filename: true,
    __dirname: true,
  },
  context: entryPath,
  entry: {
    index: './index.ts'
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: buildPath,
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader'),
        exclude: [/node_modules/, buildPath],
        options: {
          babelrc: true,
          cacheDirectory: true,
          presets: ['backpack'],
        },
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'server/tsconfig.json'
        }
      }
    ]
  },
  optimization: {
    noEmitOnErrors: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      __DEV__: env === 'development',
    }),
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: false,
      banner: `require('source-map-support/register');`
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: env === 'development'
    }),
  ],
}

module.exports = config