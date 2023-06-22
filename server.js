const express = require("express");
const db = require("./db");

const Pizza = require("./models/pizzaModel");
const path = require('path')
const ProductRouts = require("./routes/productsRouts");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

const app = express();
app.use(express.json());


app.use("/api/pizzas/", ProductRouts);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);
if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Listening on port `));
