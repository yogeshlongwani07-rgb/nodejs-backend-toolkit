const express = require("express");
const app = express();
const mysql = require("mysql2");
const ejs = require("ejs");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "college",
  password: "9571862527",
});

app.post("/user/edit/:id", (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  connection.query(
    "update users set username = ? , email = ? where id = ?",
    [username, email, id],
    (err, result) => {
      try {
        if (err) throw err;
        //   console.log(result);
        res.redirect("/");
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    },
  );
});

app.get("/", (req, res) => {
  connection.query("Select * from users", (err, result) => {
    try {
      if (err) throw err;
      //   console.log(result);
      res.render("home.ejs", { result });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  connection.query("select * from users where id = ?", id, (err, result) => {
    try {
      if (err) throw err;
      console.log(result);
      res.render("edit.ejs", { result });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });
});

app.post("/user/delete/:id", (req, res) => {
  let params = req.params.id;
  console.log(params);
  connection.query(
    "delete from users where id = ?",
    [params],
    (err, result) => {
      try {
        if (err) throw err;
        res.redirect("/");
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    },
  );
});

app.listen(3000);
