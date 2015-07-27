
export default function create(Dispatcher, ConnectionService) {

  class ArticleAction {

    addArticle(article) {
      Dispatcher.dispatch({
        eventName: 'add-article', article
      });
    }

    fetchMetadata(url) {
      console.log("in action");

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