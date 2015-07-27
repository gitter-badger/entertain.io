import socketIO from 'socket.io';

export default function create(Server, PageMetadata) {

  class CommunicationServer {

    io = socketIO(Server.server, {path : '/ws'});

    constructor() {
      this.io.on('connection', (socket) => {

        socket.on('page-metadata', PageMetadata);

      });
    }
  }

  return new CommunicationServer();
}