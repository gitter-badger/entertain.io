import React, { Component, addons } from 'react/addons';
import { Link, RouteHandler } from 'react-router';

const ReactCSSTransitionGroup = addons.CSSTransitionGroup;

import UserManagement from '../user-management';

require('./style.scss');

export default class Main extends Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  render() {
    let name = this.context.router.getCurrentPath();

    return (
      <div className="structure--main">
        <div className="header">
          <Link className="logo" to="/">
            <span className="entertain-part">ENTERTAIN</span>
            <span className="io-part">IO</span>
          </Link>
          <nav className="navigation">
            <Link to="/">Articles</Link>
            <Link to="/add-article">+</Link>
            <Link to="/test">Test-Page</Link>
          </nav>
          <div className='user-management'>
            <UserManagement/>
          </div>
        </div>
        <div className="body">
          <ReactCSSTransitionGroup component="div" transitionName="route-change">
            <RouteHandler key={name}/>
          </ReactCSSTransitionGroup>
        </div>
        <div className="footer"></div>
      </div>
    );
  }

}
