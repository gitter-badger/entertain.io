export default function create(PageMetadata, Storage) {

  class Action {

    getPageMetadata(uri, callback) {
      PageMetadata(uri, callback)
    }

    getLatestArticles(callback) {
      Storage.latestArticles(callback);
    }

    addArticle(article, session, callback) {
      Storage.addArticle(session.user, article, callback);
    }

    login(user, session) {
      session.user = user;
      session.auth = true;
      session.save();
    }

    logout(session) {
      delete session.user;
      socket.session.auth = false;
      session.save();
    }
  }

  return new Action();
}