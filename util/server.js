
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


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


    let newNote = req.body;
    newNote.id = notes.length + 1;

    
    notes.push(newNote);
    fs.writeFile("./db.json", JSON.stringify(notes), err => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
