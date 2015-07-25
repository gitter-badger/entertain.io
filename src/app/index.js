
import Dispatcher from './dispatcher/dispatcher';

import ArticleStore from './store/article-store';
import ArticleAction from './action/article-action';

import MainStructure from './structure/main';
import ArticleCollectionStructure from './structure/article-collection';
import AddArticleComponent from './component/add-article';
import ArticleComponent from './component/article';

import Router from './router/router';


// create instances
const dispatcher = Dispatcher();

const articleStore = ArticleStore(dispatcher);
const articleAction = ArticleAction(dispatcher);

const mainStructure = MainStructure();
const articleComponent = ArticleComponent();
const articleCollectionStructure = ArticleCollectionStructure(articleStore, articleComponent);
const addArticleComponent = AddArticleComponent(articleAction, articleStore);

const router = Router(mainStructure, articleCollectionStructure, addArticleComponent);