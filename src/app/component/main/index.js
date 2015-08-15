import React, { Component, addons } from 'react/addons';
import { Link, RouteHandler } from 'react-router';
import MainAction from '../../action/main-action';

const ReactCSSTransitionGroup = addons.CSSTransitionGroup;

import UserManagement from '../login';

require('../../index.scss');
require('./style.scss');

export default class Main extends Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  bodyClick(e) {
    MainAction.bodyClick(e);
  }

  render() {
    const pathName = this.context.router.getCurrentPath();

    return (
      <div className="structure--main">
        <div className="header">
          <Link className="logo" to="/">
            <span className="entertain-part">ENTERTAIN</span>
            <span className="io-part">IO</span>
          </Link>
          <nav className="navigation">
            <Link to="/">Articles</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
        <div className="body" onClick={this.bodyClick.bind(this)}>
          <ReactCSSTransitionGroup component="div" transitionName="route-change">
            <RouteHandler key={pathName}/>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
