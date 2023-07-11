const mongoose = require("mongoose");
// Define the pizza(product) schema
const pizzaSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    Varients: [],// Array to store different variants/sizes of the product
    prices: [],// Array to store prices for each variant
    catagory: { type: String, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
  },
  { timestamps: true }
);
const pizzaModel = mongoose.model("pizzas", pizzaSchema);

module.exports = pizzaModel;
