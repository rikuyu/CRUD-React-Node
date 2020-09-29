const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345Kobayashi",
  database: "node_items",
});

// connection.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  connection.query("SELECT * FROM vegetables", (error, results) => {
    // if (error) throw error;
    res.render("index.ejs", { vegetables: results });
  });
});

app.post("/api/insert", (req, res) => {
  const vegeId = req.body.id;
  const vegeName = req.body.name;
  const vegeColor = req.body.color;

  connection.query(
    "INSERT INTO vegetables(id, name, color) VALUES (?, ?, ?)",
    [vegeId, vegeName, vegeColor],
    (error, results) => {
      console.log(result);
    }
  );
});

app.listen(3001, () => {
  console.log("Running server on port 3001");
});
