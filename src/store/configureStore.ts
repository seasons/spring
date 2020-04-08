import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware] // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers) as any

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
