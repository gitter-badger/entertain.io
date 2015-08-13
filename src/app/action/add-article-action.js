import Debug from 'debug';
import Dispatcher from '../dispatcher';
import ConnectionService from '../service/connection';
import AddArticleStore from '../store/add-article-store'
const debug = Debug('app:add-article-action');

class ArticleAction {

  changeTitle(title) {
    Dispatcher.dispatch({
      eventName: 'change-title', title
    });
  }

  changeDesc(desc) {
    Dispatcher.dispatch({
      eventName: 'change-desc', desc
    });
  }

  changeUrl(url) {
    Dispatcher.dispatch({
      eventName: 'change-url', url
    });
  }

  addArticle() {
    let article = AddArticleStore.state.article;
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

  showAdvancedForm() {
    Dispatcher.dispatch({
      eventName: 'show-advanced-form'
    });
  }

  hideAdvancedForm() {
    Dispatcher.dispatch({
      eventName: 'hide-advanced-form'
    });
  }

}

export default new ArticleAction();
