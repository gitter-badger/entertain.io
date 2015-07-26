
import Dispatcher from './dispatcher/dispatcher';

import ArticleStore from './store/article-store';
import ArticleAction from './action/article-action';

import MainStructure from './structure/main';
import ArticleStructure from './structure/article';

import ArticleCollectionComponent from './component/article-collection';
import AddArticleComponent from './component/add-article';


import Router from './router/router';


// Create instances
const dispatcher = Dispatcher();

const articleStore = ArticleStore(dispatcher);
const articleAction = ArticleAction(dispatcher);

const mainStructure = MainStructure();
const articleStructure = ArticleStructure();

const articleCollectionComponent = ArticleCollectionComponent(articleStore, articleStructure);
const addArticleComponent = AddArticleComponent(articleAction, articleStore);

const router = Router(mainStructure, articleCollectionComponent, addArticleComponent);
