const express = require("express");
// import dotenv from 'dotenv';
const dotenv = require("dotenv");
// import cookieParser from 'cookie-parser';
const cookieParser = require("cookie-parser");
// import "ejs"

const app = express();

app.set("view engine", "ejs");

// set the public folder
app.use(express.static("public"));
// set the data that will be send in forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the environment variables
dotenv.config({ path: "./env/.env" });

// Set the cookie parser
app.use(cookieParser());

//call the router for the index view
app.use("/", require("./routes/router"));

// Avoid go back to the login view after logout
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

app.listen(3000, () => {
  console.log("Hey!! Your server is running in http://localhost:3000");
});
