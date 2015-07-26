import DevServer from './services/dev-server';
import ProdServer from './services/prod-server';

if (process.env.NODE_ENV !== 'production') {
  new DevServer();
} else {
  new ProdServer();
}
