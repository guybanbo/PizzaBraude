export const getALLProductsReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS_REQUEST":
      return { ...state, loading: true };

    case "GET_ALL_PRODUCTS_SUCCESS":
      return { pizzas: action.payload, loading: false };

    case "GET_ALL_PRODUCTS_FAILURE":
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};
