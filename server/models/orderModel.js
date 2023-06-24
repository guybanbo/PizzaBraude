const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    address: { type: String, require },
    email: { type: String, require },
    phoneNumber: { type: String, require },
    subtotal: { type: String, require },
    currentUser: { type: Object },
    cartItems: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
