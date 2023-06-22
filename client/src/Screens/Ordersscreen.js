import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

export default function Ordersscreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "35px" }}>My Orders</h1>
      <hr />
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders &&
          orders.map((order) => {
            return (
              <div
                className="col-md-8 m-2 p-1"
                style={{ backgroundColor: "#3a86ff", color: "white" }}
              >
                <div className="flex-container">
                  <div className="text-left w-100 m-1">
                    <h1 style={{ fontSize: "25px" }}>Items</h1>
                    <hr />
                    {order.cartItems.map((item) => {
                      return (
                        <div>
                          <p>
                            {item.name} [{item.varient}] * {item.quantity} ={" "}
                            {item.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-left w-100 m-1">
                    <h1 style={{ fontSize: "25px" }}>Address</h1>
                    <hr />

                    <p>address : {order.address}</p>
                    <p>phone number : {order.phoneNumber}</p>
                  </div>
                  <div className="text-left w-100 m-1">
                    <h1 style={{ fontSize: "25px" }}>Order Info</h1>
                    <hr />
                    subtotal = {order.subtotal} ils
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
