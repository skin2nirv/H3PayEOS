import { applyMiddleware, createStore, compose } from "redux";
import reducers from '../../reducers';
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import authMiddleware from '../middleware/authMiddleware';

const isDebuggingInChrome = false;

const logger = process.env.ENV == 'production' ? undefined
  : createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
  });

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: false,
  }) : compose;

export default createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk, authMiddleware, logger)));