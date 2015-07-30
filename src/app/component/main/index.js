import React, { Component } from 'react';
import { Link, RouteHandler } from 'react-router';

import addons from "react/addons";
let ReactCSSTransitionGroup = addons.addons.CSSTransitionGroup;



require('./style.scss');

export default function create() {

  class Main extends Component {
    contextTypes = {
      router: React.PropTypes.func.isRequired
    }

    render() {
      console.log(this);
      const name = this.context.router.getCurrentPath();
      return (
        <div className="structure--main">
          <div className="header">
            <Link className="logo" to="/">
              <span className="entertain-part">ENTERTAIN</span>
              <span className="io-part">IO</span>
            </Link>
            <nav className="navigation">
              <Link to="/">Article-Collection</Link>
              <Link to="/add-article">+</Link>
            </nav>
          </div>
          <div className="body">
            <ReactCSSTransitionGroup component="div" transitionName="example">
              <RouteHandler key={name}/>
            </ReactCSSTransitionGroup>
          </div>
          <div className="footer"></div>
        </div>
      );
    }
  }
  // <RouteHandler/>
  Main.contextTypes = {
    router: React.PropTypes.func.isRequired
  };


  return Main;
}
