export {};

// Routes must be created here
import { Request, Response, NextFunction } from "express";
const { application } = require("express");
const express = require("express");
const router = express.Router();
// import connection
const connection = require("./database/db");

// Get all users
router.get("/", (req: Request, res: Response) => {
  connection.query("SELECT * FROM users", (err: any, rows: any) => {
    if (err) {
      throw err;
    } else {
      res.render("index", { rows: rows });
    }
  });
});

// Route for creating all users
router.get("/create", (req: Request, res: Response) => {
  res.render("create");
});

const crud = require("./controllers/crud");

// Route for updating an specific user based on id
router.get("/edit/:id", (req: Request, res: Response) => {
  // define an err type for typescript
  const id = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    (err: any, rows: any) => {
      if (err) {
        throw err;
      } else {
        res.render("edit", { row: rows[0] });
      }
    }
  );
});

router.get("/delete/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
      }
    }
  );
});

router.post("/save", crud.save);
router.post("/update", crud.update);

module.exports = router;
