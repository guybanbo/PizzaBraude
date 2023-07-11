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
// Combine multiple reducers into a single reducer
const finalReducers = combineReducers({
  getALLProductsReducer: getALLProductsReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
});
// Retrieve cart items from localStorage, if available
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// Retrieve current user from localStorage, if available
const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
  // Define initial state of the Redux store
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
// Create the Redux store
const store = legacy_createStore(
  finalReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunks))
);
export default store;
