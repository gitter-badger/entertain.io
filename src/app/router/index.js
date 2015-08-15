import React from 'react';
import Router, {Route} from 'react-router';

import Main from '~/src/app/component/main';
import ArticleCollection from '~/src/app/component/article-collection';
import AddArticle from '~/src/app/component/add-article';
import Login from '~/src/app/component/login';
import UserProfile from '~/src/app/component/user-profile';
import TagPage from '~/src/app/component/tag-page';


export default class {
  routes = (
    <Route handler={Main}>
      <Route path="/" handler={ArticleCollection}/>
      <Route path="/login" handler={Login}/>
      <Route path="/@:username" handler={UserProfile}/>
      <Route path="/tag/:tag" handler={TagPage}/>
    </Route>
  );

  constructor(root) {
    Router.run(this.routes, Router.HashLocation, (Root) => {
      React.render(<Root/>, root);
    });
  }
}
