const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

// create a route for the login view
router.get("/login", (req, res) => {
  res.render("login");
});

// create a route for the register view
router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
