import DevServer from './services/dev-server';
import Server from './services/server';
import PageMetadata from './services/page-metadata';
import Communication from './services/communication';
import Storage from './services/storage';

const server = Server();
const pageMetadata = PageMetadata();
const storage = Storage();
const communication = Communication(server, pageMetadata, storage);


if (process.env.NODE_ENV !== 'production') {
  new DevServer(server);
}
