// dependecies
const express = require("express");
const fs = require("fs");
const path = require("path");


// handling asynchronous processes
const readFileAsync = util.promisify(fs.readFile);
const writefileAsync = util.promisify(fs.writeFile);

// setting up server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());

// HTML routes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API routes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) throw err;

    let notes = JSON.parse(data);

    // Assign unique ID to new note
    let newNote = req.body;
    newNote.id = notes.length + 1;

    // Add new note to notes array and write to db.json file
    notes.push(newNote);
    fs.writeFile("./db.json", JSON.stringify(notes), err => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Start server
app.listen(process.env.PORT || 3001);
