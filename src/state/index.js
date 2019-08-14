import { createStore, applyMiddleware } from "redux";
import { actions } from "./actions";

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./reducer";

const loggerMiddleware = createLogger();

const middlewares = [thunkMiddleware, loggerMiddleware];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store, actions };
