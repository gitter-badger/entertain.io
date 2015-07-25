
export default function create(Dispatcher) {

  class ArticleAction {

    addArticle(article) {
      Dispatcher.dispatch({
        eventName: 'add-article', article
      });
    }

  }

  return new ArticleAction();
}