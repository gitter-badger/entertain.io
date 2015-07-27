import socketIOClient from 'socket.io-client';

export default function create() {

  class CommunicationClient {
    socket = socketIOClient({path : '/ws'}); // connect

    getPageMetadata(uri, callback) {
      this.socket.emit('page-metadata', uri, callback);
    }
  }

  return new CommunicationClient();
}