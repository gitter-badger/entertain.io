import React, { Component } from 'react';
import { Link, RouteHandler } from 'react-router';

require('./style.scss');

export default function create() {

  class Main extends Component {
    render() {
      return (
        <div className="structure--main">
          <div className="header">
            <Link className="logo" to="/">
              <span className="entertain-part">ENTERTAIN</span>
              <span className="io-part">IO</span>
            </Link>
            <nav className="navigation">
              <Link to="/">Article-Collection</Link>
            </nav>
            <button>+</button>
          </div>
          <div className="body">
            <RouteHandler/>
          </div>
          <div className="footer"></div>
        </div>
      );
    }
  }

  return Main;
}
