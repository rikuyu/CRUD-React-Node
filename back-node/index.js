const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "node_items",
});

// データの取得
app.get("/get", (req, res) => {
  const sqlSelect = "SELECT * FROM vegetables";
  connection.query(sqlSelect, (error, results) => {
    res.send(results);
    console.log(results);
  });
});

// データの挿入
app.post("/insert", (req, res) => {
  const vegeId = req.body.id;
  const vegeName = req.body.name;
  const vegeColor = req.body.color;

  const sqlInsert = "INSERT INTO vegetables(id, name, color) VALUES (?, ?, ?)";

  connection.query(
    sqlInsert,
    [vegeId, vegeName, vegeColor],
    (error, results) => {
      console.log("エラー：" + error);
    }
  );
});
// データの削除
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM vegetables WHERE id = ?";

  connection.query(sqlDelete, id, (error, reslts) => {
    console.log(error);
  });
});
// データの更新
app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const color = req.body.color;

  const sqlUpdate = "UPDATE vegetables SET name = ?, color = ? WHERE id = ?";

  connection.query(sqlUpdate, [name, color, id], (error, reslts) => {
    console.log(error);
  });
});

app.listen(3001, () => {
  console.log("Running server on port 3001");
});
