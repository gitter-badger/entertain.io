export default function create({pageMetadata, storage, auth, tagSuggest}) {

  class Action {

    getPageMetadata(uri, callback) {
      pageMetadata(uri, callback)
    }

    getTagSuggestion(uri, callback) {
      tagSuggest(uri, callback);
    }

    getLatestArticles(callback) {
      storage.latestArticles(callback);
    }

    addArticle(article, session, callback) {
      storage.addArticle(article, session.user.username, callback);
    }

    login(username, password, session, callback) {
      session.auth = auth.areCredentialsCorrect(username, password);
      if (session.auth) {
        session.user = auth.getUser(username);
        session.save();
        callback(null, session.user);
      } else {
        callback('Wrong credentials');
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
      else callback('Not Authenticated');
    }
  }

  return new Action();
}