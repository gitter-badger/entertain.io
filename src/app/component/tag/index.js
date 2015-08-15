import React, { Component, addons } from 'react/addons';

require('./style.scss');

export default class Tag extends Component {

  deleteTag(idx) {
    return () => {
      this.props.tags.splice(idx, 1);
      this.props.tagsModifyed(this.props.tags);
    }
  }

  inputEvent(event) {

    if (event.which === 13) {  // enter
      event.preventDefault();

      this.props.tags.push(event.target.value);
      event.target.value = '';
      this.props.tagsModifyed(this.props.tags);
    }

    if (event.which === 44 || event.which === 59) {  // seperator
      let split = event.target.value.split(/,|;/);
      event.target.value = '';
      this.props.tagsModifyed(this.props.tags.concat(split));
      event.preventDefault();
    }

  }

  render() {
    return (
      <div className='component--tag'>
        <i className='tags'></i>
        <div className='article-tags'>
          {this.props.tags.map((tag, idx) =>
              (<span className='tag' key={idx}>{tag}<button className='close' onClick={this.deleteTag(idx)}></button></span>)
          )}
          <input className='new-tag' type='text' placeholder='Add Tag' onKeyPress={this.inputEvent.bind(this)}/>
        </div>
      </div>
    );
  }
}
