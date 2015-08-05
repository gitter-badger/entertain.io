import DevServer from './services/dev-server';
import Server from './services/server';
import PageMetadata from './services/page-metadata';
import TagSuggest from './services/tag-suggest';
import Communication from './services/communication';
import Storage from './services/storage';
import Auth from './services/auth.js';
import Action from './action';

const pageMetadata = PageMetadata();
const tagSuggest = TagSuggest();
const storage = Storage();
const auth = Auth();
const action = Action({pageMetadata, storage, auth, tagSuggest});

storage.mongo.db().then((db) => {

  const server = Server({db});
  const communication = Communication({server, action});

  if (process.env.NODE_ENV !== 'production') {
    new DevServer({server});
  }

});
