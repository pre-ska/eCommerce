import SHOP_DATA from "./shop.data";
import { UserActionTypes } from "./shop.types";

const INITIAL_STATE = {
  collections: SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.XXXXXXXXX:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default shopReducer;
