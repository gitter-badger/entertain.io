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
        
        socket.on('login', (username, password, callback) => {
          Action.login(username, password, socket.request.session, callback);
        });

        socket.on('logout', (callback) => {
          Action.logout(socket.request.session, callback);
        });

        socket.on('current-user', (callback) => {
          Action.currentUser(socket.request.session, callback);
        });

        socket.on('page-metadata', Action.getPageMetadata.bind(Action));
        socket.on('tag-suggest', Action.getTagSuggestion.bind(Action));
        socket.on('latest-articles', Action.getLatestArticles.bind(Action));

        socket.on('add-article', (article, callback) => {
          Action.addArticle(article, socket.request.session, callback);
        });

      });
    }
  }

  return new CommunicationServer();
}