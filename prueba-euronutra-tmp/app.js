const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use router
app.use(require("./router"));
// export the database connection

// We enable the template engine "ejs" with app.set method
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("server running in http://localhost:3000");
});
