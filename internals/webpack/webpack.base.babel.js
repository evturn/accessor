const path = require('path')
const webpack = require('webpack')

module.exports = options => ({
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      test: /\.css$/,
      exclude: [ /node_modules/, /draft/ ],
      loader: options.cssLoaders,
    }, {
      test: /\.css$/,
      include: [ /node_modules/, /draft/ ],
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
      loader: 'url-loader?limit=10000',
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=fonts/[name].[hash].[ext]',
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  plugins: options.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      fetch: 'exports?self.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]),
  postcss: () => options.postcssPlugins,
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.react.js',
    ],
    packageMains: [
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web',
  stats: false,
  progress: true,
})
