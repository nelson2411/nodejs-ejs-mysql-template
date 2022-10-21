const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();

// Routes for views
router.get("/", authController.isAuthenticaded, (req, res) => {
  res.render("index", { user: req.user });
});

// create a route for the login view
router.get("/login", (req, res) => {
  res.render("login", { alert: false });
});

// create a route for the register view
router.get("/register", (req, res) => {
  res.render("register");
});

// Routes for methods in the controller
// register a new user
router.post("/register", authController.register);
// login a user
router.post("/login", authController.login);
// logout a user
router.get("/logout", authController.logout);

module.exports = router;
