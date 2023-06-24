import axios from "axios";
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_PRODUCTS_REQUEST" });

  try {
    const response = await axios.get("http://pizza-braude-server.vercel.app"+"/api/pizzas/getallpizzas");

    dispatch({ type: "GET_ALL_PRODUCTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCTS_FAILURE", payload: error });

    alert(error);
  }
};
