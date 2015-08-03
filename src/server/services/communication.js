import socketIO from 'socket.io';
import cookieParser from 'cookie-parser';

export default function create(Server, Action) {

  class CommunicationServer {

    io = socketIO(Server.server, {path: '/ws'});

    constructor() {

      this.io.use(function(socket, next) {
        Server.session(socket.request, socket.request.res, next);
      });

      this.io.on('connection', (socket) => {
        
        console.log("socket.handshake.session", socket.request.session);

        socket.on('login', (user) => {
          Action.login(user, socket.request.session);
        });

        socket.on('logout', () => {
          Action.logout(socket.request.session);
        });

        socket.on('page-metadata', Action.getPageMetadata.bind(Action));
        socket.on('latest-articles', Action.getLatestArticles.bind(Action));

        socket.on('add-article', (article, callback) => {
          Action.addArticle(article, socket.request.session, callback);
        });

      });
    }
  }

  return new CommunicationServer();
}