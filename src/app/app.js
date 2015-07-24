import React, { Component } from 'react';
import { Link, RouteHandler } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <Link to="/search">S</Link>
          <Link to="/timeline">T</Link>
        </div>
        <div className="content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
}
