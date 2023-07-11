export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the item already exists in the cart
      const allreadyExists = state.cartItems.find(
        (item) =>
          item._id === action.payload._id &&
          item.varient === action.payload.varient
      );
      if (allreadyExists) {
        // If the item already exists, update it in the cart
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id &&
            item.varient === action.payload.varient
              ? action.payload
              : item
          ),
        };
      } else {
        // If the item doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case "DELETE_TO_CART":
      // Remove the item from the cart
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item._id !== action.payload._id ||
            (item._id === action.payload._id &&
              item.varient !== action.payload.varient)
        ),
      };

    default:
      return state;
  }
};
