import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';

export default function create({db}) {

  const mongoSessionStore = connectMongo(expressSession);

  class Server {
    app = express();
    PORT = process.env.PORT || 8000;

    session = expressSession({
      store : new mongoSessionStore({ db : db }),
      secret: 'Hyp-du-Q',
      resave: true,
      saveUninitialized: true
    });

    constructor() {

      this.app.use(morgan('dev'));     // logging requests
      this.app.use(bodyParser.json()); // parse json requests
      this.app.set('json spaces', 2);  // pretty print json
      this.app.use(this.session);

      this.app.use('/assets', express.static(path.join(process.env.PWD, '/dist/assets')));

      this.app.get('/', (req, res) => {
        res.sendFile(path.join(process.env.PWD, '/dist/index.html'));
      });

      this.app.set('port', this.PORT);

      this.server = this.app.listen(this.app.get('port'), () => {
        this.host = this.server.address().address;
        this.port = this.server.address().port;

        console.log('App listening at http://%s:%s', this.host, this.port);
      });

    }
  }

  return new Server();
}
