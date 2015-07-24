import React, { Component } from 'react';
import { Link, RouteHandler } from 'react-router';

export default class extends Component {
  render() {
    return (
      <div className="app">
        <div className="header">
          <Link to="/">Article-Collection</Link>
        </div>
        <div className="content">
          <RouteHandler/>
        </div>
        <div>

        </div>
      </div>
    );
  }
}
