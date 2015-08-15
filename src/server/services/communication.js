import socketIO from 'socket.io';
import cookieParser from 'cookie-parser';

export default function create({server, action}) {

  class CommunicationServer {

    io = socketIO(server.server, {path: '/ws'});

    constructor() {

      this.io.use(function(socket, next) {
        server.session(socket.request, socket.request.res, next);
      });

      this.io.on('connection', (socket) => {

        //console.log("socket.request.session", socket.request.session);

        socket.on('register', action.register.bind(action));

        socket.on('login', (username, password, callback) => {
          action.login(username, password, socket.request.session, callback);
        });

        socket.on('logout', (callback) => {
          action.logout(socket.request.session, callback);
        });

        socket.on('current-user', (callback) => {
          action.currentUser(socket.request.session, callback);
        });

        socket.on('page-metadata', action.getPageMetadata.bind(action));
        socket.on('tag-suggest', action.getTagSuggestion.bind(action));
        socket.on('latest-articles', action.getLatestArticles.bind(action));

        socket.on('add-article', (article, callback) => {
          action.addArticle(article, socket.request.session, callback);
        });

        socket.on('upvote', (articleId, callback) => {
          action.upvote(articleId, socket.request.session, callback);
        })

        socket.on('remove', (articleId, callback) => {
          action.remove(articleId, socket.request.session, callback);
        });

      });
    }
  }

  return new CommunicationServer();
}
