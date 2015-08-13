import Debug from 'debug';
import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';
const debug = Debug('app:article-action');

class ArticleAction {
  latestArticles() {
    ConnectionService.latestArticles((err, articles) => {
      Dispatcher.dispatch({
        eventName: 'latest-articles', articles
      });
    })
  }

  addArticle(article) {
    ConnectionService.addArticle(article, (err, article) => {
      if (err) {
        console.error(err);
        return;
      }
      Dispatcher.dispatch({
        eventName: 'add-article', article
      });
    });
  }

  fetchMetadata(url) {
    ConnectionService.getPageMetadata(url, (err, data) => {
      debug("get page metadata", err, data);
      Dispatcher.dispatch({
        eventName: 'metadata-update', data
      });
    });

    ConnectionService.getTagSuggest(url, (err, data) => {
      if (!err)
        Dispatcher.dispatch({
          eventName: 'tag-suggestions', data
        });
    });
  }

  constructor() {
    this.latestArticles();
  }
}

export default new ArticleAction();
