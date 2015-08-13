import socketIOClient from 'socket.io-client';

class CommunicationClient {
  socket = socketIOClient.connect('http://127.0.0.1:8000', {
    path: '/ws'
  });


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

  register(username, password, callback) {
    this.socket.emit('register', username, password, callback);
  }

  constructor() {
    // for debugging
    window.socket = this.socket;
  }
}

export default new CommunicationClient();
