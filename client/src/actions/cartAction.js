import Swal from "sweetalert2";

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

  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: "DELETE_TO_CART", payload: pizza });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
