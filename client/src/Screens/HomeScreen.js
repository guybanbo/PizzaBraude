import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Pizza from "../components/Pizza";
import { useSelector } from "react-redux";
import { getAllProducts } from "../actions/pizzaAction";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function HomeScreen() {
  const dispatch = useDispatch();
  // Retrieve pizzas state from Redux store
  const pizzasstate = useSelector((state) => state.getALLProductsReducer);
  const { pizzas, error, loading } = pizzasstate;
  // Dispatch an action to fetch all products (pizzas)
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
      }}
    >
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) :Array.isArray(pizzas) && pizzas.length>0?
          // Render each pizza as a component
          (pizzas.map((pizza) => {
            return (
              <div className="col-md-3 " key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })
        ):(
            // Display a message if there are no pizzas available
            <p>No pizzas.</p>
          )})
      </div>
    </div>
  );
}
