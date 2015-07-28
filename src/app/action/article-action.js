
export default function create(Dispatcher, ConnectionService) {

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
        Dispatcher.dispatch({
          eventName: 'add-article', article
        });
      });
    }

    fetchMetadata(url) {

      // call server
      ConnectionService.getPageMetadata(url, (err, data) => {

        // servers response
        Dispatcher.dispatch({
          eventName: 'metadata-update', data
        });
      });

    }

  }

  return new ArticleAction();
}