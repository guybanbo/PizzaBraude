import axios from "axios";
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_PRODUCTS_REQUEST" });

  try {
    const response = await axios.get("/api/pizzas/getallpizzas");

    dispatch({ type: "GET_ALL_PRODUCTS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_PRODUCTS_FAILURE", payload: error });

    alert(error);
  }
};
