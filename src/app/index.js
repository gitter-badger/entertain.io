import React, { Component } from 'react';
import Router, { Route, Link, RouteHandler } from 'react-router';

import App from './app';

require('./app.scss');

const routes = (
  <Route handler={App}>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.getElementById('App'));
});
