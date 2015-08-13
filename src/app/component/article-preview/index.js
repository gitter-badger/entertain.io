import React, { Component, addons } from 'react/addons';
const ReactCSSTransitionGroup = addons.CSSTransitionGroup;

require('./style.scss');

export default class AddArticle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('------------');
    console.log(this.props);
    return (
      <div className='article-preview'>
        <div className='contents'>
          <div className='article-detail'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' value={this.state.article.title} onChange={this.changeTitle.bind(this)}/>
          </div>

          <div className='article-detail'>
            <label htmlFor='desc'>Description</label>
            <textarea id='desc' onChange={this.changeDesc.bind(this)}>{this.state.article.desc}</textarea>
          </div>

          <div className='article-detail'>
            <label>Tags</label>
            <ul className='tags'>
              {this.state.tags.popular.concat(this.state.tags.recommended).map((tag, id) =>
                (<li key={id} className="popular">{tag}</li>)
              )}
            </ul>
          </div>

          <button onClick={this.add.bind(this)}>Add Article</button>
        </div>

        <div className='preview'>
          <Article key='article' {...this.state}/>
        </div>
      </div>
    );
  }
}
