const mongoose = require("mongoose");
var db = require("./db");

var MongoUrl =
  "mongodb+srv://barmalka1419:B0548316212m!@cluster0.fzhtkie.mongodb.net/MyPizza";
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (err) => {
  console.log(err);
});
module.exports = mongoose;
