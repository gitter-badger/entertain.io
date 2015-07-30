import React from 'react';
import Router, {Route} from 'react-router';

export default function create(Main, ArticleCollection) {

  const routes = (
    <Route handler={Main}>
      <Route path="/" handler={ArticleCollection}/>
    </Route>
  );

  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, document.getElementById('App'));
  });

}
