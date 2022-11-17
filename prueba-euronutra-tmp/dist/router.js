"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { application } = require("express");
const express = require("express");
const router = express.Router();
// import connection
const connection = require("./database/db");
// Get all users
router.get("/", (req, res) => {
    connection.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            res.render("index", { rows: rows });
        }
    });
});
// Route for creating all users
router.get("/create", (req, res) => {
    res.render("create");
});
const crud = require("./controllers/crud");
// Route for updating an specific user based on id
router.get("/edit/:id", (req, res) => {
    // define an err type for typescript
    const id = req.params.id;
    connection.query("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            res.render("edit", { row: rows[0] });
        }
    });
});
router.get("/delete/:id", (req, results) => {
    const id = req.params.id;
    connection.query("DELETE FROM users WHERE id = ?", [id], (err, res) => {
        if (err) {
            throw err;
        }
        else {
            res.redirect("/");
        }
    });
});
router.post("/save", crud.save);
router.post("/update", crud.update);
module.exports = router;
//# sourceMappingURL=router.js.map