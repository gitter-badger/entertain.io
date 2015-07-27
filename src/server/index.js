import DevServer from './services/dev-server';
import Server from './services/server';
import PageMetadata from './services/page-metadata';
import Communication from './services/communication';

const server = Server();
const pageMetadata = PageMetadata();
const communication = Communication(server, pageMetadata);


if (process.env.NODE_ENV !== 'production') {
  new DevServer(server);
}
