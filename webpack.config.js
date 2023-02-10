const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(pdf)$/,
        loader: 'file-loader',
        options: {
          name: (resourcePath) =>
            resourcePath.match(/[\\\/]src[\\\/](?<file>.+)/iu).groups.file,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
