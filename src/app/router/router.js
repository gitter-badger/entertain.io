import React from 'react';
import Router, {Route} from 'react-router';

export default function create(Main, ArticleCollection, AddArticle, Test) {

  const routes = (
    <Route handler={Main}>
      <Route path="/" handler={ArticleCollection}/>
      <Route path="/add-article" handler={AddArticle}/>
      <Route path="/test" handler={Test}/>
    </Route>
  );

  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, document.getElementById('App'));
  });

}
