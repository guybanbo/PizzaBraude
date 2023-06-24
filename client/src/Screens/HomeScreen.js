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

  const pizzasstate = useSelector((state) => state.getALLProductsReducer);
  const { pizzas, error, loading } = pizzasstate;

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
        ) : (
          pizzas.map((pizza) => {
            return (
              <div className="col-md-3 " key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
  console.log(pizzas);
}
