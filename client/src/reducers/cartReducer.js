export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const allreadyExists = state.cartItems.find(
        (item) =>
          item._id === action.payload._id &&
          item.varient === action.payload.varient
      );
      if (allreadyExists) {
        console.log(action.payload);
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
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case "DELETE_TO_CART":
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