const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var base_config = {
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  resolveLoader: {
    modules: ['node_modules', path.join(__dirname, 'lib')]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, '_scss')]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      { 
        test: /\.brfs\.js$/,
        enforce: 'post',
        loader: "transform-loader?brfs" 
      }
    ]
  }
}

if(process.env["NODE_ENV"] == "production") {
    base_config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
    )
    base_config.optimization = {
        minimizer: [new UglifyJsPlugin()]
    }
} else {
    base_config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('development')
          }
        })
    )
    base_config.devtool = 'inline-source-map'
    base_config.devServer = {
      contentBase: path.resolve(__dirname),
      watchContentBase: true,
      // hot: true,
      historyApiFallback: true,
      publicPath: path.resolve(__dirname, '/js/'),
      proxy: {}
    }
}


config = [
  Object.assign(
    {
      entry: './js/main.js',
      output: {
        path: path.resolve(__dirname, "js"),
        publicPath: path.resolve(__dirname, '/js/'),
        filename: 'app.js'
      }
    },
    base_config
  ),
]

module.exports = config