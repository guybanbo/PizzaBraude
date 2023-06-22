import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Swal from "sweetalert2";

export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const OrderHandler = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const OrderDetails = {
        address,
        phoneNumber,
        subtotal,
      };

      dispatch(placeOrder(OrderDetails));
      Swal.fire({
        title: "Success!",
        text: "We got your order details",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("cartItems");
          window.location.href = "/";
        }
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setModalIsOpen(false);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    // Card Number Validation
    if (!cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = "Card number must be numeric";
    }

    // Expiration Date Validation
    if (!expDate) {
      errors.expDate = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expDate)) {
      errors.expDate = "Expiration date must be in the format MM/YYYY";
    }

    // CVC Validation
    if (!cvc) {
      errors.cvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(cvc)) {
      errors.cvc = "CVC must be a 3 or 4-digit number";
    }

    // Address Validation
    if (!address) {
      errors.address = "Address is required";
    }

    // Phone Number Validation
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be a 10-digit number";
    }

    return errors;
  };

  return (
    <div style={{ position: "sticky", paddingTop: "1cm" }}>
      <Button
        onClick={() =>
          subtotal > 0 ? setModalIsOpen(true) : alert("Your cart is empty")
        }
      >
        Open Checkout
      </Button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(errors).length > 0 && (
            <Alert variant="danger">
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Card Number:</Form.Label>
              <Form.Control
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiration Date (MM/YYYY):</Form.Label>
              <Form.Control
                type="text"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>CVC:</Form.Label>
              <Form.Control
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvc}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <h2>Check: {subtotal} ILS</h2>
            <Button variant="primary" onClick={OrderHandler}>
              Pay Now
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
