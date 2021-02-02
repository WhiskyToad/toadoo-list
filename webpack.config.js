const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const productionConfig = merge([
  {
    output: {
      publicPath: "/toadoo-list"
    },
  },
]);