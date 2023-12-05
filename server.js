const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(require('cors')())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

//this is the variable for the database. to initialize a new one, look at databaseinitialize.js
const db = new sqlite3.Database('./serverdatabase.db');


app.get('/', (req, res) => {
  res.send('hi');
});

// Retrieve all courses
app.get('/courses', (req, res) => {
  db.all('SELECT * FROM courses', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(rows);
  });
});

// Retrieve a specific course by ID
app.get('/course/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (row) {
      res.send(row);
    } else {
      res.status(404).send({});
    }
  });
});

// Update a course by ID
app.post('/course/update/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.run(
    'UPDATE courses SET name = ?, description = ?, creditHours = ?, subjectArea = ?, teacherId = ? WHERE id = ?',
    [req.body.name, req.body.description, req.body.creditHours, req.body.subjectArea, req.body.teacherId, id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send({});
    }
  );
});

// Delete a course by ID
app.post('/course/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Deleting course:" + id)
  db.run('DELETE FROM courses WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send({});
  });
});

// Create a new course
app.post('/course/create', (req, res) => {
  db.run(
    'INSERT INTO courses (name, description, creditHours, subjectArea, teacherId) VALUES (?, ?, ?, ?, ?)',
    [req.body.name, req.body.description, req.body.creditHours, req.body.subjectArea, req.body.teacherId],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send({});
    }
  );
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
