const express = require("express");
const db = require("./db");

const Pizza = require("./models/pizzaModel");

const ProductRouts = require("./routes/productsRouts");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use("/api/pizzas/", ProductRouts);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Listening on port `));
