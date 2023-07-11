import axios from "axios";
// Action to register a user
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    // Send a POST request to the server to register the user
    const response = await axios.post("https://pizza-braude-server.vercel.app/api/users/register", user);

    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (e) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: e });
  }
};
// Action to log in a user
export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    // Send a POST request to the server to log in the user
    const response = await axios.post("https://pizza-braude-server.vercel.app/api/users/login", user);
    // Dispatch an action with the logged-in user data and store it in localStorage
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));

    // Redirect to the home page after successful login
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};
// Action to log out a user
export const logoutUser = () => (dispatch) => {
  // Remove the currentUser data from localStorage
  localStorage.removeItem("currentUser");
  // Redirect to the login page after logging out
  window.location.href = "/login";
};
