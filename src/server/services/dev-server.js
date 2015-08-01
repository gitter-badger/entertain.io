import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from '../../../config/development.webpack';


export default function create(Server) {

  class DevServer {

    PORT = 3000;

    constructor() {
      new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        contentBase: path.resolve('dist'),
        stats: { colors: true },
        proxy: {
          '*': `http://localhost:${Server.PORT}`
        }
      }).listen(this.PORT, 'localhost', (err) => {
          if (err) {
            console.log(err);
          }
          console.log(`Listening at localhost:${this.PORT}`);
        });
    }
  }

  return new DevServer();
}
