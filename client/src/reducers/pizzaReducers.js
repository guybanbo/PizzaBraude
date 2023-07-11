export const getALLProductsReducer = (state = { pizzas: []}, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS_REQUEST":
      return {loading: true, ...state };
    case "GET_ALL_PRODUCTS_SUCCESS":
      // Set the fetched pizzas and reset the loading state
      return { pizzas: action.payload, loading: false };

    case "GET_ALL_PRODUCTS_FAILURE":
      return { error: action.payload, loading: false };

    default:
      return state;
  }
};
