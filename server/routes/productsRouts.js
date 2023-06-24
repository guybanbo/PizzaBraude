const express = require("express");
const router = express.Router();
const Product = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
  try {
    const Proudacts = await Product.find({});
    res.send(Proudacts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
