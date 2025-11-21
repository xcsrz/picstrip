const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

var base_config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  plugins: [
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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
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
    // Webpack 5 uses terser by default, no need for uglifyjs-webpack-plugin
    base_config.optimization = {
        minimize: true
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
      static: {
        directory: path.resolve(__dirname)
      },
      watchFiles: ['**/*'],
      historyApiFallback: true,
      devMiddleware: {
        publicPath: '/js/'
      }
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