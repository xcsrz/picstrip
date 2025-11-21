const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'index.html',
          to: 'index.html',
          transform(content) {
            // Update script path to be relative when copied to dist directory
            return content.toString().replace('src="dist/js/app.js"', 'src="js/app.js"')
          }
        }
      ]
    })
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource'
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  // Webpack 5 uses terser by default for minification
  baseConfig.optimization = {
    minimize: true
  }
} else {
  baseConfig.devtool = 'inline-source-map'
  baseConfig.devServer = {
    static: {
      directory: path.resolve(__dirname)
    },
    watchFiles: ['**/*'],
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/dist/'
    }
  }
}

const config = {
  ...baseConfig,
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js',
    clean: true
  }
}

module.exports = config