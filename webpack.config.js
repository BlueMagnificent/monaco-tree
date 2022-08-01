const path = require('path');
const fs = require('fs');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 7070,
    historyApiFallback: true,
  },

  mode:"production",

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['file?name=[name].[ext]'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options:{
          name:"/img/[name].[ext]"
        }
      },
    ],
  },
};
