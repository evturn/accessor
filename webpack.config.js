const path = require('path')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')
const postcssFocus = require('postcss-focus')
const postcssReporter = require('postcss-reporter')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CWD = process.cwd()

const configureWebpack = opts => ({
  entry: opts.entry,

  output: Object.assign({
    path: path.resolve(CWD, 'build'),
  }, opts.output),

  plugins: [
    ...opts.plugins,
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      title: 'Accessor - I heard you like records',
      filename: 'index.html',
      appMountId: 'app',
      favicon: 'app/favicon.png',
      inject: true,
    }),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: opts.babelQuery,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: opts.cssLoaders,
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: [ 'style-loader', 'css-loader' ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
        [
          'image-webpack?{',
          'progressive:true,',
          'optimizationLevel: 7,',
          'interlaced: false,',
          'pngquant:{quality: "65-90", speed: 4}}'
        ].join(''),
      ],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader?limit=10000',
    }],
  },

  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.react.js'],
    packageMains: [
      'jsnext:main',
      'main',
    ],
    alias: {
      containers: path.join(CWD, 'app', 'containers'),
      components: path.join(CWD, 'app', 'components'),
      actions:    path.join(CWD, 'app', 'actions.js'),
      constants:  path.join(CWD, 'app', 'constants.js'),
      api:        path.join(CWD, 'app', 'api'),
      styles:     path.join(CWD, 'app', 'containers', 'Root', 'style.css'),
    },
  },

  postcss: _ => [
    postcssFocus(),
    cssnext({ browsers: ['last 2 versions', 'IE > 10'] }),
    postcssReporter({ clearMessages: true }),
  ],

  devtool: opts.devtool,
  target: 'web',
  stats: false,
  progress: true,
})

const devBuild = _ => configureWebpack({
  entry: [
    'webpack-hot-middleware/client',
    path.join(CWD, 'app/index.js')
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunky.mclover.js',
  },

  babelQuery: {
    presets: [ 'react-hmre' ]
  },

  devtool: 'inline-source-map',

  cssLoaders: [
    `style-loader`,
    `!css-loader`,
    `?localIdentName=[local]--[path]-[hash:base64:5]`,
    `&modules&importLoaders=1`,
    `&sourceMap`,
    `!postcss-loader`,
  ].join(''),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WriteFilePlugin({log: false}),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.DefinePlugin({__DEV__: true})
  ],
})

const prodBuild = _ => configureWebpack({
  entry: {
    main: path.join(CWD, 'app/index.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'firebase'
    ],
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunky.mclover.js'
  },

  cssLoaders: ExtractTextPlugin.extract(
    'style-loader',
    [`css-loader`, `?modules&importLoaders=1`, `!postcss-loader`].join('')
  ),

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest']}),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})

module.exports = process.env.NODE_ENV === 'development'
  ? devBuild()
  : prodBuild()