import socketIO from 'socket.io';
import cookieParser from 'cookie-parser';

export default function create(Server, PageMetadata, Storage) {

  class CommunicationServer {

    io = socketIO(Server.server, {path: '/ws'});

    constructor() {

      this.io.use(function(socket, next) {
        Server.session(socket.request, socket.request.res, next);
      });

      this.io.on('connection', (socket) => {
        
        console.log("socket.handshake.session", socket.request.session);

        socket.on('login', (user) => {
          socket.request.session.user = user;
          socket.request.session.auth = true;
          socket.request.session.save();
        });

        socket.on('page-metadata', PageMetadata);
        socket.on('latest-articles', Storage.latestArticles.bind(Storage));
        socket.on('add-article', Storage.addArticle.bind(Storage));

      });
    }
  }

  return new CommunicationServer();
}