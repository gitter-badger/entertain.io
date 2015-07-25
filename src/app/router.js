import React from 'react';
import Router, {Route} from 'react-router';

require('./app.scss');

export default function create(Main, ArticleCollection, AddArticle) {

  const routes = (
    <Route handler={Main}>
      <Route path="/" handler={ArticleCollection}/>
      <Route path="/add" handler={AddArticle}/>
    </Route>
  );

  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, document.getElementById('App'));
  });

}

