import Debug from 'debug';
import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';
const debug = Debug('app:article-action');

class ArticleAction {
  upvote(article, articleIdx, user, callback) {
    ConnectionService.upvote(article._id, (err) => {
      if (err) {
        debug('Err upvote()', err);
        callback(err)
      } else {
        Dispatcher.dispatch({
          eventName: 'upvote-article', article, articleIdx, user
        });
      }
    });
  }

  latestArticles() {
    ConnectionService.latestArticles((err, articles) => {
      Dispatcher.dispatch({
        eventName: 'latest-articles', articles
      });
    });
  }

  remove(articleId) {
    ConnectionService.remove(articleId, (err) => {
      if (err) debug('Err remove()', err);
      else Dispatcher.dispatch({
        eventName: 'remove-article', articleId
      });
    });
  }

  constructor() {
    this.latestArticles();
  }
}

export default new ArticleAction();
