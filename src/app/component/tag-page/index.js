import React, { Component, addons } from 'react/addons';

require('./style.scss');

export default class TagPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='component--tag-page'>
        <h1>Tag: {this.props.params.tag}</h1>
      </div>
    );
  }
}
