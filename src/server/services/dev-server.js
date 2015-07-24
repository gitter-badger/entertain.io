import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from '../../../config/development.webpack';

const PORT = 3000 || process.env.PORT;

export default function() {

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve('dist')
  }).listen(PORT, 'localhost', (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Listening at localhost:${PORT}`);
  });

}