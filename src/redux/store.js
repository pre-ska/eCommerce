import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist"; //9-2

import rootReducer from "./rootReducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store); //9-2

export { store, persistor };
