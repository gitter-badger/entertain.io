
import Dispatcher from './dispatcher';

import ArticleStore from './store/article-store';

import MainStructure from './structure/main';
import ArticleCollectionStructure from './structure/article-collection';
import AddArticleComponent from './component/add-article';
import ArticleComponent from './component/article';

import Router from './router';


// create instances
const dispatcher = Dispatcher();

const articleStore = ArticleStore(dispatcher);

const mainStructure = MainStructure();
const articleComponent = ArticleComponent();
const articleCollectionStructure = ArticleCollectionStructure(articleStore, articleComponent);
const addArticleComponent = AddArticleComponent(dispatcher, articleStore);

const router = Router(mainStructure, articleCollectionStructure, addArticleComponent);