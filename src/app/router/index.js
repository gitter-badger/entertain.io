import React from 'react';
import Router, {Route} from 'react-router';

import Main from '~/src/app/component/main';
import ArticleCollection from '~/src/app/component/article-collection';
import AddArticle from '~/src/app/component/add-article';
import Login from '~/src/app/component/login';
import Register from '~/src/app/component/register';


export default class {
  routes = (
    <Route handler={Main}>
      <Route path="/" handler={ArticleCollection}/>
      <Route path="/login" handler={Login}/>
      <Route path="/register" handler={Register}/>
    </Route>
  );

  constructor(root) {
    Router.run(this.routes, Router.HashLocation, (Root) => {
      React.render(<Root/>, root);
    });
  }
}
