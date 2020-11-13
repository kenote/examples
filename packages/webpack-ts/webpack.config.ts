import * as path from 'path'
import * as webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

const env = process.env.NODE_ENV || 'production'
const entryPath = path.resolve(process.cwd(), 'src')
const buildPath = path.resolve(process.cwd(), 'dist')

const config: webpack.Configuration = {
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
    filename: env === 'development' ? '[name].js' : '[name].min.js',
    sourceMapFilename: env === 'development' ? '[name].map' : '[name].min.map',
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
          configFileName: 'tsconfig.json'
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
    new FriendlyErrorsWebpackPlugin({
      clearConsole: env === 'development'
    }),
  ],
}

export default config