import async from  'async';

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
      if (!session.auth) return callback('auth missing!');

      article.upvotes = [session.user.username];

      storage.addArticle(article, session.user.username, (err, article) => {
        console.log("-- article", err, article);
        session.user.articles.push(article._id);
        session.save();
        storage.saveUser(session.user, (err) => {
          callback(err, article);
        });
      });

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