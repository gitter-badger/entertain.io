import DevServer from './services/dev-server';
import Server from './services/server';
import PageMetadata from './services/page-metadata';
import Communication from './services/communication';
import Storage from './services/storage';
import Auth from './services/auth.js';
import Action from './action';

const pageMetadata = PageMetadata();
const storage = Storage();
const action = Action(pageMetadata, storage);

storage.mongo.db().then((db) => {

  const server = Server(db);
  const communication = Communication(server, action);
  //const auth = Auth(server, communication);

  if (process.env.NODE_ENV !== 'production') {
    new DevServer(server);
  }

});
