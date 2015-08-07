import React from 'react';
import Router, {Route} from 'react-router';

import Main from '../component/main';
import ArticleCollection from '../component/article-collection';
import Test from '../component/test';
import AddArticle from '../component/add-article';


export default class {
  routes = (
    <Route handler={Main}>
      <Route path="/" handler={ArticleCollection}/>
      <Route path="/add-article" handler={AddArticle}/>
      <Route path="/test" handler={Test}/>
    </Route>
  );

  constructor(root) {
    Router.run(this.routes, Router.HashLocation, (Root) => {
      React.render(<Root/>, root);
    });
  }
}
