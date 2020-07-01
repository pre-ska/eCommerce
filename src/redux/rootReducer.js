import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"; //9-2
import storage from "redux-persist/lib/storage"; //9-2

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";
import directoryReducer from "./directory/directory.reducer";

//9-2
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  user: userReducer,
  directory: directoryReducer,
  cart: cartReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
