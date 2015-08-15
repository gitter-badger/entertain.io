import React, { Component, addons } from 'react/addons';

require('./style.scss');

export default class Tag extends Component {

  render() {

    return (
      <div className='component--tag'>
        <i className='tags'></i>
        <div className='article-tags'>
          {this.props.tags.map((tag, id) =>
              (<span className='tag' key={id}>{tag}<button className='close'></button></span>)
          )}
          <input className='new-tag' type='text' placeholder='Add Tag'/>
        </div>
      </div>
    );
  }
}
