import { Request, Response } from "express";
const connection = require("../database/db");

exports.save = (req: Request, res: Response) => {
  // Get the data from the form: user, role and date
  const user = req.body.user;
  const role = req.body.role;
  connection.query(
    "INSERT INTO users SET ?",
    { user: user, role: role },
    (err: any, result: any) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
      }
    }
  );
};

exports.update = (req: Request, res: Response) => {
  // Get the data from the form: user, role and date
  const id = req.body.id;
  const user = req.body.user;
  const role = req.body.role;
  connection.query(
    "UPDATE users SET ? WHERE id = ?",
    [{ user: user, role: role }, id],
    (err: any, result: any) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
      }
    }
  );
};
