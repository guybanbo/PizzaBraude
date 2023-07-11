import Swal from "sweetalert2";
// Create a cart item object with necessary details
export const Addtocart = (pizza, quantity, varient) => (dispatch, getState) => {
  var cartItem = {
    _id: pizza._id,
    name: pizza.name,
    image: pizza.image,
    varient: varient,
    quantity: Number(quantity),
    prices: pizza.prices,
    price: pizza.prices[0][varient] * quantity,
  };
// Check if the quantity exceeds the limit of 9
  if (cartItem.quantity > 9) {
    Swal.fire({
      icon: "error",
      title: "you cant add more than 9 items from the same quantity",
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  } else {
    if (cartItem.quantity <= 0) {
      dispatch({ type: "DELETE_TO_CART", payload: pizza });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
  }
// Retrieve updated cart items from the store and store it in localStorage
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
// Action to delete an item from the cart
export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: "DELETE_TO_CART", payload: pizza });
  // Retrieve updated cart items from the store and store it in localStorage
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
