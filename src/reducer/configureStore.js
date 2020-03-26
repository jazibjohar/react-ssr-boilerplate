import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {}

export const configureStore = reducers => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
