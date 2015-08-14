import async from  'async';

export default function create({pageMetadata, storage, auth, tagSuggest, shareCount}) {

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

    upvote(articleId, session, callback) {
      if (!session.auth) return callback('auth missing!');
      if (session.user.articles.filter(x => x === articleId).length > 0) return callback('already upvoted');

      session.user.articles.push(articleId);

      storage.getArticle(articleId, (err, article) => {
        article.upvotes += 1;
        storage.saveArticle(article, (err, article) => {
          session.save();
          storage.saveUser(session.user, (err) => {
            callback(err);
          });
        })
      });

    }

    addArticle(article, session, callback) {
      if (!session.auth) return callback('auth missing!');

      article.upvotes = 1;

      shareCount(article.url, (err, shareCount) => {
        article.shareCount = shareCount;

        storage.addArticle(article, session.user.username, (err, article) => {
          session.user.articles.push(article._id);
          session.save();
          storage.saveUser(session.user, (err) => {
            callback(err, article);
          });
        });

      });

    }

    login(username, password, session, callback) {
      auth.login(username, password, session, callback);
    }

    logout(session, callback) {
      auth.logout(session, callback);
    }

    register = auth.register.bind(auth.register);

    currentUser(session, callback) {
      if (session.auth) callback(null, session.user);
      else callback('Not Authenticated');
    }
  }

  return new Action();
}