var webpack = require('webpack');
var path = require('path');


// console.log(">>>>>>>>")
// console.log(path.resolve(__dirname, "js"))
// console.log(">>>>>>>>")


var base_config = {
  resolve: {
    extensions: ['.js', '.jsx'],
    // modules: [path.join(__dirname, 'lib')]
  },
  resolveLoader: {
    modules: ['node_modules', path.join(__dirname, 'lib')]
  //   root: path.join(__dirname, 'lib')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
    base_config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        })
    )
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
      entry: './app/app.jsx',
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