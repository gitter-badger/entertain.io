import socketIO from 'socket.io';

export default function create(Server, PageMetadata, Storage) {

  class CommunicationServer {

    io = socketIO(Server.server, {path: '/ws'});

    constructor() {
      this.io.on('connection', (socket) => {

        socket.on('page-metadata', PageMetadata);
        socket.on('latest-articles', Storage.latestArticles.bind(Storage));
        socket.on('add-article', Storage.addArticle.bind(Storage));

      });
    }
  }

  return new CommunicationServer();
}