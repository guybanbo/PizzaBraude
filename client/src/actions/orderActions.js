import axios from "axios";
export const placeOrder = (OrderDetails) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
 // Retrieve necessary details from the store
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  const subtotal = OrderDetails.subtotal;
  const address = OrderDetails.address;
  const phoneNumber = OrderDetails.phoneNumber;

  try {
    // Check if the user is logged in and retrieve their email
    const CheckEmail = currentUser != null && currentUser.email != null;
// Send a POST request to the server to place the order
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
    // Send a POST request to the server to retrieve user orders
    const response = await axios.post("https://pizza-braude-server.vercel.app/api/orders/getuserorders", {
      email: currentUser.email,
    });


    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
  }
};
