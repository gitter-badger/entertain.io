export default function create(PageMetadata, Storage, Auth) {

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

    login(username, password, session, callback) {
      session.auth = Auth.areCredentialsCorrect(username, password);
      if (session.auth) {
        session.user = Auth.getUser(username);
        session.save();
        callback(null, session.user);
      } else {
        callback(new Error('Wrong credentials'));
      }
    }

    logout(session, callback) {
      delete session.user;
      session.auth = false;
      session.save();
      callback(null);
    }

    currentUser(session, callback) {
      if (session.auth) callback(null, session.user);
      else callback(new Error('Not Authenticated'));
    }
  }

  return new Action();
}