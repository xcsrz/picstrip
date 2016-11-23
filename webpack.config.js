var webpack = require('webpack');
var path = require('path');

var base_config = {
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'lib')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    postLoaders: [
      { loader: "transform?brfs" }
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
    base_config.devtool = 'inline-source-map'
}


config = [
  Object.assign(
    {
      entry: './app/app.jsx',
      output: {
        path: path.join(__dirname, "js"),
        filename: 'app.js'
      }
    },
    base_config
  ),
]

module.exports = config