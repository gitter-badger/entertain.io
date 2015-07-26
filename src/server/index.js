import DevServer from './services/dev-server';
import Server from './services/server';

const server = Server();

if (process.env.NODE_ENV !== 'production') {
  new DevServer(server);
}
