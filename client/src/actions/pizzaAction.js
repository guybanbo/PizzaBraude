import axios from "axios";
// Action to get all products
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_PRODUCTS_REQUEST" });

  try {
// Send a GET request to the server to retrieve all of the products
    const response = await axios.get("https://pizza-braude-server.vercel.app/api/pizzas/getallpizzas");

    dispatch({ type: "GET_ALL_PRODUCTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCTS_FAILURE", payload: error });

    alert(error);
  }
};
