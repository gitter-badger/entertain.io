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

    getTagSuggest(uri, callback) {
      this.socket.emit('tag-suggest', uri, callback);
    }

    currentUser(callback) {
      this.socket.emit('current-user', callback);
    }

    login(username, password, callback) {
      this.socket.emit('login', username, password, callback);
    }

    logout(callback) {
      this.socket.emit('logout', callback);
    }

    constructor() {
      // for debugging
      window.socket = this.socket;
    }
  }

  return new CommunicationClient();
}