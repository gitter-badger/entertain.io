import React, { Component, addons } from 'react/addons';
import { Link, RouteHandler } from 'react-router';

const ReactCSSTransitionGroup = addons.CSSTransitionGroup;

require('./style.scss');

export default function create(UserManagement) {

  class Main extends Component {
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
              <Link to="/">Article-Collection</Link>
              <Link to="/test">test</Link>
            </nav>
            <UserManagement/>
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

  return Main;
}
