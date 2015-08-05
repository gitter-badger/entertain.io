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
      auth.login(username, password, session, callback);
    }

    logout(session, callback) {
      auth.logout(session, callback);
    }

    currentUser(session, callback) {
      if (session.auth) callback(null, session.user);
      else callback('Not Authenticated');
    }
  }

  return new Action();
}