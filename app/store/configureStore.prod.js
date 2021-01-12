// @flow
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';

const history = createHashHistory();
const router = routerMiddleware(history);
const promise = promiseMiddleware({
  promiseTypeSuffixes: ['START', 'SUCCESS', 'FAIL']
});

const enhancer = applyMiddleware(thunk, router, promise);

function configureStore(initialState?: any) {
  return createStore(rootReducer, initialState, enhancer);
}

export default {configureStore, history};
