import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Addtocart } from "../actions/cartAction";
import { deleteFromCart } from "../actions/cartAction";
import { Button } from "react-bootstrap";
import Checkout from "../components/Checkout";
import Modal from "react-modal";

export default function Cartscreen() {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  // Calculate the subtotal by summing up the prices of all items in the cart
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const dispatch = useDispatch();
  return (
    <div className="cart">
      <div className="row justify-content-center">
        <div className="col-md-6"></div>
        <h2 style={{ fontSize: "50px" }}> my Cart</h2>

        {cartItems.map((item) => {
          return (
            <div className="flex-container  ">
              <div className="text-left m-1 w-100">
                <h1>
                  {item.name}[{item.varient}]
                </h1>
                <h1>
                  Price : {item.quantity} * {item.prices[0][item.varient]}=
                  {item.price}
                </h1>
                <h1 style={{ display: "inline" }}>
                  Quantity:
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() =>
                      dispatch(Addtocart(item, item.quantity + 1, item.varient))
                    }
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() =>
                      dispatch(Addtocart(item, item.quantity - 1, item.varient))
                    }
                  ></i>
                  <hr />
                </h1>
              </div>
              <div className="m-1 w-60 mt-1">
                <img
                  src={item.image}
                  style={{ height: "150px", width: "150px" }}
                />
              </div>

              <div className="m-1 w-100">
                <i
                  className="fa fa-trash mt-5"
                  aria-hidden="true"
                  onClick={() => {
                    dispatch(deleteFromCart(item));
                  }}
                  style={{ fontSize: "37px" }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "", top: "4cm", right: "1.5cm" }}>
        <h2 style={{ fontsize: "45px" }}>SubTotal: {subtotal} -ILS</h2>
        <Checkout subtotal={subtotal} />
      </div>
    </div>
  );
}
