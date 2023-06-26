import axios from "axios";
export const placeOrder = (OrderDetails) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });

  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  const subtotal = OrderDetails.subtotal;
  const address = OrderDetails.address;
  const phoneNumber = OrderDetails.phoneNumber;

  try {
    const CheckEmail = currentUser != null && currentUser.email != null;

    const response = await axios.post("https://pizza-braude-server.vercel.app/api/orders/placeorder", {
      address,
      email: CheckEmail ? currentUser.email : null,
      phoneNumber,
      subtotal,
      currentUser,
      cartItems,
    });

    dispatch({ type: "PLACE_ORDER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAILED" });
    console.log(error);
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

  try {
    const response = await axios.post("https://pizza-braude-server.vercel.app/api/orders/getuserorders", {
      email: currentUser.email,
    });


    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_ALLORDERS_REQUEST" });

  try {
    const response = await axios.get("/api/orders/getallorders");


    dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALLORDERS_FAILED", payload: error });
  }
};
