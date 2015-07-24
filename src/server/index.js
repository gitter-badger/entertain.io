import DevServer from './services/dev-server';

if (process.env.NODE_ENV !== 'production') {
  new DevServer();
} else {
  throw new Error('@TODO');
}
