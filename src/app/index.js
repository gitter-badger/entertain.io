
import Dispatcher from './dispatcher/dispatcher';

import ArticleStore from './store/article-store';
import UserStore from './store/user-store';
import ArticleAction from './action/article-action';
import UserAction from './action/user-action';

import ConnectionService from './service/connection';

import MainComponent from './component/main';
import ArticleComponent from './component/article';
import ArticleCollectionComponent from './component/article-collection';
import AddArticleComponent from './component/add-article';
import UserManagementComponent from './component/user-management';
import Test from './component/test';


import Router from './router/router';


// Create instances
const dispatcher = Dispatcher();

const connectionService = ConnectionService();

const articleStore = ArticleStore(dispatcher);
const userStore = UserStore(dispatcher);
const articleAction = ArticleAction(dispatcher, connectionService);
const userAction = UserAction(dispatcher, connectionService);

const articleComponent = ArticleComponent();

const addArticleComponent = AddArticleComponent(articleStore, articleAction, articleComponent);
const articleCollectionComponent = ArticleCollectionComponent(articleStore, articleComponent, addArticleComponent);

const userManagementComponent = UserManagementComponent(userStore, userAction);

const test = Test();

const mainComponent = MainComponent(userManagementComponent);
const router = Router(mainComponent, articleCollectionComponent, test);
