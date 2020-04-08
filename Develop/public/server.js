const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const note = [];


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(note);
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});