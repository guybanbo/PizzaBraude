const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");
router.post("/placeorder", async (req, res) => {
  const { address, email, phoneNumber, subtotal, currentUser, cartItems } =
    req.body;

  try {
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

router.post("/getuserorders", async (req, res) => {
  const { email } = req.body;
  try {
    const orders = await Order.find({ email: email });

    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
