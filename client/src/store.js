import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { legacy_createStore } from "redux";
import thunks from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { getALLProductsReducer } from "./reducers/pizzaReducers";
import { cartReducer } from "./reducers/cartReducer";
import { registerUserReducer } from "./reducers/userReducer";
import { loginUserReducer } from "./reducers/userReducer";
import { placeOrderReducer } from "./reducers/orderReducer";
import { getUserOrdersReducer } from "./reducers/orderReducer";

const finalReducers = combineReducers({
  getALLProductsReducer: getALLProductsReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
});
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
  getALLProductsReducer: {
    pizzas:[],
    error: null,
    loading:true,
  },
};
const composeEnhancers = composeWithDevTools({});
const store = legacy_createStore(
  finalReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunks))
);
export default store;
