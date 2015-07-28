import socketIOClient from 'socket.io-client';

export default function create() {

  class CommunicationClient {
    socket = socketIOClient({path : '/ws'}); // connect

    latestArticles(callback) {
      this.socket.emit('latest-articles', callback);
    }

    addArticle(article, callback) {
      this.socket.emit('add-article', article, callback);
    }

    getPageMetadata(uri, callback) {
      this.socket.emit('page-metadata', uri, callback);
    }
  }

  return new CommunicationClient();
}