const mongoose = require("mongoose");
// Define the order schema
const orderSchema = mongoose.Schema(
  {
    address: { type: String, require },
    email: { type: String, require },
    phoneNumber: { type: String, require },
    subtotal: { type: String, require },
    currentUser: { type: Object },
    cartItems: [],// Array to store the order items
  },
  {
    timestamps: true,// Automatically add timestamp fields (createdAt, updatedAt)
  }
);

module.exports = mongoose.model("orders", orderSchema);
