const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../database/db.js");
const { promisify } = require("util");

// We define the process for registering a new user
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const password = req.body.password;
    // Make a hash of the password
    let passHash = await bcrypt.hash(password, 8);
    //Check the data catched
    console.log(`Name: ${name} User: ${user} Password: ${passHash}`);
    // Insert the data into the database
    connection.query(
      "INSERT INTO users SET ?",
      { name: name, user: user, password: passHash },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// We define the process for logging in a user
exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const password = req.body.password;
    console.log(`User: ${user} Password: ${password}`);
    // Check if the user exists
    if (!user || !password) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y password",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } else {
      connection.query(
        "SELECT * FROM users WHERE user = ?",
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcrypt.compare(password, results[0].password))
          ) {
            res.render("login", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario o password incorrecto",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          } else {
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRATION,
            });
            console.log("The token is: " + token);
            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              alertTitle: "Conexión exitosa",
              alertMessage: "¡LOGIN CORRECTO!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: "",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// Create authentification middleware

exports.isAuthenticaded = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      connection.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id],
        (error, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect("/login");
  }
};

// Create logout method

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/login");
};
