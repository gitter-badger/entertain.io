import DevServer from './services/dev-server.js';

if (process.env.NODE_ENV !== 'production') {
  DevServer();
} else {
  throw new Error('@TODO');
}
