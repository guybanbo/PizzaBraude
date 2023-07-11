import React, { useState } from "react";

export default function Checkout() {
  // Define state variables for card details
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Expiration Month:</label>
          <input
            type="text"
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
          />
        </div>
        <div>
          <label>Expiration Year:</label>
          <input
            type="text"
            value={expYear}
            onChange={(e) => setExpYear(e.target.value)}
          />
        </div>
        <div>
          <label>CVC:</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
