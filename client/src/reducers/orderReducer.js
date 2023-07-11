export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      // Set loading state when placing an order
      return {
        loading: true,
      };
    case "PLACE_ORDER_SUCCESS":
      // Set success state when order placement is successful
      return {
        loading: false,
        success: true,
      };
    case "PLACE_ORDER_FAILED":
      // Set error state when order placement fails
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getUserOrdersReducer = (state = { oredrs: [] }, action) => {
  switch (action.type) {
    case "GET_USER_ORDERS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_USER_ORDERS_SUCCESS":
       // Set user orders when fetching is successful
      return {
        loading: false,
        orders: action.payload,
      };
    case "GET_USER_ORDERS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
