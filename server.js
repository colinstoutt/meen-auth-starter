// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userController = require("./controllers/users");

// bcrypt
const bcrypt = require("bcrypt");
const hashedString = bcrypt.hashSync(
  "yourPasswordStringHere",
  bcrypt.genSaltSync(10)
);

// .env
require("dotenv").config();
const PORT = process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use("/users", userController);

// mongoose connect
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose connection status messages
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// listener
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
