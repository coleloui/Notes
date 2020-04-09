const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const dbJsonArrDir = path.resolve(__dirname, "db");
const dbJsonArrPath = path.join(dbJsonArrDir, "db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  const note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(note);
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  const db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const lastElement = db.length > 0 ? db[db.length - 1] : null;
  const id = lastElement !== null ? lastElement.id + 1 : 1;
  const newDb = [...db, { ...newNote, id }];
  fs.writeFileSync(
    "./db/db.json",
    JSON.stringify(newDb),
    "utf8"
  );
  res.json(newDb);
});


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
