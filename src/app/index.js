import React, { Component } from 'react';
import Router, { Route, Link, RouteHandler } from 'react-router';

import Main from './structure/main';
import AddArticle from './component/add-article';

import ArticleCollection from './structure/article-collection';

require('./app.scss');

const routes = (
  <Route handler={Main}>
    <Route path="/" handler={ArticleCollection}/>
    <Route path="/add" handler={AddArticle}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.getElementById('App'));
});
