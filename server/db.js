const mongoose = require("mongoose");
var db = require("./db");

var MongoUrl =
  "mongodb+srv://pizza_owner:Guybanbo123456@cluster0.f6m9i.mongodb.net/MyPizza";
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (err) => {
  console.log(err);
});
module.exports = mongoose;
