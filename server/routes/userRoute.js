const e = require("express");
const express = require("express");

const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the email already exists, return an error response
      return res.status(400).json({ message: "Email already exists" });
    }

    // If the email doesn't exist, create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Return a success response
    res.send("User created successfully");
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        _id: user[0]._id,
        isAdmin: user[0].isAdmin,
      };

      res.send(currentUser);
    } else {
      return res.status(400).json({ message: "User Login Fail" });
    }
  } catch (error) {
    return res.status(400).json({ message: "something went wrong  " });
  }
});


module.exports = router;
