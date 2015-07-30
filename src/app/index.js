
import Dispatcher from './dispatcher/dispatcher';

import ArticleStore from './store/article-store';
import ArticleAction from './action/article-action';

import ConnectionService from './service/connection';

import MainComponent from './component/main';
import ArticleComponent from './component/article';

import ArticleCollectionComponent from './component/article-collection';
import AddArticleComponent from './component/add-article';


import Router from './router/router';


// Create instances
const dispatcher = Dispatcher();

const connectionService = ConnectionService();

const articleStore = ArticleStore(dispatcher);
const articleAction = ArticleAction(dispatcher, connectionService);

const mainComponent = MainComponent();
const articleComponent = ArticleComponent();

const addArticleComponent = AddArticleComponent(articleStore, articleAction);
const articleCollectionComponent = ArticleCollectionComponent(articleStore, articleComponent);

const router = Router(mainComponent, articleCollectionComponent, addArticleComponent);

// init stores
articleAction.latestArticles();
