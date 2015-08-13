import Debug from 'debug';
import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';
const debug = Debug('app:article-action');

class ArticleAction {
  upvote(article, articleIdx, user) {
    Dispatcher.dispatch({
      eventName: 'upvote-article', article, articleIdx, user
    });
  }

  latestArticles() {
    ConnectionService.latestArticles((err, articles) => {
      Dispatcher.dispatch({
        eventName: 'latest-articles', articles
      });
    })
  }

  constructor() {
    this.latestArticles();
  }
}

export default new ArticleAction();
