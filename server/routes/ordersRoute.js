const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");
// Route for placing an order
router.post("/placeorder", async (req, res) => {
  const { address, email, phoneNumber, subtotal, currentUser, cartItems } =
    req.body;

  try {
    // Create a new order instance
    const newOrder = new Order({
      address: address,
      email: email,
      phoneNumber: phoneNumber,
      subtotal: subtotal,
      currentUser: currentUser,
      cartItems: cartItems,
    });

    if (subtotal > 0) {
      newOrder.save();
      res.send("Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});
// Route for getting orders of a specific user
router.post("/getuserorders", async (req, res) => {
  const { email } = req.body;
  try {
    // Find orders by email
    const orders = await Order.find({ email: email });

    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
