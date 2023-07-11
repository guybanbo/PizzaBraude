import React from "react";
import { logoutUser } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
export default function Navbar() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const cartstate = useSelector((state) => state.cartReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  return (
    <div className="shadow-lg p-3 mb-5 bg-white rounded ">
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <a className="navbar-brand" href="/">
          <h2>PizzaBraude</h2>
        </a>

        <div className="collapse show navbar-collapse  " id="navbarNav">
          <ul className="navbar-nav " style={{ marginLeft: "auto" }}>
            {currentUser ? (
              // Dropdown for logged-in user
              <div
                className="dropdown"
                style={{ marginTop: "0.2cm", marginRight: "0.2cm" }}
              >
                <a
                  className="btn btn-secondary  dropdown-toggle nav-link"
                  textSize="large"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {currentUser.name}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/orders">
                    Orders
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    <li>Logout</li>
                  </a>
                </div>
              </div>
            ) : (
              // Display login option if user is not logged in
              <li className="nav-item active">
                <a className="nav-link" href="/login">
                  <h2>Login</h2> <span className="sr-only"></span>
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <h2>Cart {cartstate.cartItems.length}</h2>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
