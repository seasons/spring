// in src/createAdminStore.js
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { routerMiddleware, connectRouter } from "connected-react-router"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import { all, fork } from "redux-saga/effects"
import { adminReducer, adminSaga } from "react-admin"
import sessionReducer from "../reducers/sessionReducer"

export default ({ authProvider, dataProvider, history }) => {
  const reducer = combineReducers({
    session: sessionReducer,
    admin: adminReducer,
    router: connectRouter(history),
  })
  //   const resettableAppReducer = (state, action) => reducer(action.type !== USER_LOGOUT ? state : undefined, action)

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider),
        // add your own sagas here
      ].map(fork)
    )
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer,
    // resettableAppReducer,
    {},
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
        // add your own middlewares here
      )
      // add your own enhancers here
    )
  )
  sagaMiddleware.run(saga)
  return store
}