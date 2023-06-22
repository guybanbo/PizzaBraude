import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; // Add this import
import { Addtocart } from "../actions/cartAction";

export default function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [varients, setVarients] = useState("small");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  function addtocart() {
    dispatch(Addtocart(pizza, quantity, varients));
  }
  return (
    <div className="shadow-lg p-2 mb-5 bg-white rounded">
      <div onClick={handleShow}>
        <p style={{ fontSize: "2rem" }}>{pizza.name}</p>
        <img
          src={pizza.image}
          className="img-fluid"
          style={{ height: "270px", width: "350px" }}
        />
      </div>
      <div className="flex-container">
        <div className="w-100 m-1">
          <p style={{ fontSize: "1rem" }}>Size</p>
          <select
            className="form-control "
            style={{ fontSize: "1rem", textAlign: "center" }}
            value={varients}
            onChange={(e) => {
              setVarients(e.target.value);
            }}
          >
            {pizza.Varients.map((varient) => {
              return <option value={varient}>{varient}</option>;
            })}
          </select>
        </div>
        <div className="w-100 m-1">
          <p style={{ fontSize: "1rem" }}>Quantity</p>
          <select
            className="form-control"
            style={{ fontSize: "1rem", textAlign: "center" }}
            value={quantity}
            onChange={(q) => {
              setQuantity(q.target.value);
            }}
          >
            {[...Array(9).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <h4 className="mt-2">
            Price :{pizza.prices[0][varients] * quantity} ILS
          </h4>
        </div>
        <div className="m-1 w-100">
          <button className="btn w-2" onClick={addtocart}>
            <text>add to cart</text>
          </button>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            <h2>{pizza.name}</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={pizza.image}
            className="img-fluid"
            style={{ height: "450px ", width: "450px " }}
          ></img>
          <p>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
