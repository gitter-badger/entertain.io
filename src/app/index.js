import React, { Component } from 'react';
import Router, { Route, Link, RouteHandler } from 'react-router';

import Main from './structure/main';

import ArticleCollection from './structure/article-collection';

require('./app.scss');

const routes = (
  <Route handler={Main}>
    <Route path="/" handler={ArticleCollection}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.getElementById('App'));
});
