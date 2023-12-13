const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;
const session = require("express-session");
const uuid = require("uuid");

app.use(
  require("cors")({
    origin: "https://m08finalprojectfrontend.phillipsnodgras.repl.co",
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    genid: (req) => {
      return uuid.v4(); // generate unique session IDs using uuid
    },
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Always use secure flag in production // Always use httpOnly for session cookies
      HttpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
      sameSite: "none", // Set to none for multiple origins, lax or strict for single origin
    },
  }),
);

//this is the variable for the database. to initialize a new one, look at databaseinitialize.js
const db = new sqlite3.Database("./serverdatabase.db");

app.get("/", (req, res) => {
  res.send("hi");
});

// Retrieve all courses
app.get("/courses", (req, res) => {
  isAuthorized = false;
  const authorizationHeader = req.headers["authorization"];

  db.get(
    "SELECT isTeacher FROM users WHERE uuid = ?",
    [authorizationHeader],
    (err, row) => {
      if ((row && row.isTeacher == 1) || (row && row.isTeacher == 0)) {
        isAuthorized = true;
      }

      if (isAuthorized == false) {
        res.status(401).send("No.");
        return;
      } else {
        db.all("SELECT * FROM courses", (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
            return;
          }
          res.send(rows);
        });
      }
    },
  );
});

// Retrieve a specific course by ID
app.get("/course/:id", (req, res) => {
  const id = parseInt(req.params.id);

  db.get("SELECT * FROM courses WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
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
app.post("/course/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const authorizationHeader = req.headers["authorization"];

  // Check if the user is authorized to update a course
  db.get(
    "SELECT isTeacher FROM users WHERE uuid = ?",
    [authorizationHeader],
    (err, row) => {
      if (row && row.isTeacher == 1) {
        // The user is a teacher, proceed with the update
        db.run(
          "UPDATE courses SET name = ?, description = ?, creditHours = ?, subjectArea = ?, teacherId = ? WHERE id = ?",
          [
            req.body.name,
            req.body.description,
            req.body.creditHours,
            req.body.subjectArea,
            req.body.teacherId,
            id,
          ],
          function (err) {
            if (err) {
              console.error(err.message);
              res.status(500).send("Internal Server Error");
              return;
            }
            res.send({});
          },
        );
      } else {
        // The user is not a teacher, send unauthorized status
        res.status(401).send("Unauthorized");
      }
    },
  );
});

app.post("/course/delete/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  //console.log(req);
  const authorizationHeader = req.headers["authorization"];

  const id = parseInt(req.params.id);
  isAuthorized = false;
  // Check if the user is authorized to delete a course
  db.get(
    "SELECT isTeacher FROM users WHERE uuid = ?",
    [authorizationHeader],
    (err, row) => {
      if (row && row.isTeacher == 1) {
        isAuthorized = true;
        // The user is a teacher, proceed with the deletion
        if (isAuthorized == true) {
          console.log("Deleting course:" + id);
          db.run("DELETE FROM courses WHERE id = ?", [id], function (err) {
            if (err) {
              console.error(err.message);
              res.status(500).send("Internal Server Error");
              return;
            }
            res.send({});
          });
        }
      } else {
        // The user is not a teacher, send unauthorized status
        console.log(row);
        res.status(401).send("Unauthorized");
      }
    },
  );
});

// Create a new course
app.post("/course/create", (req, res) => {
  console.log(req.headers["authorization"]);
  isAuthorized = false;
  const authorizationHeader = req.headers["authorization"];
  db.get(
    "SELECT isTeacher FROM users WHERE uuid = ?",
    [authorizationHeader],
    (err, row) => {
      if (row && row.isTeacher == 1) {
        isAuthorized = true;
        console.log(isAuthorized + "one");
        if (isAuthorized == true) {
          db.run(
            "INSERT INTO courses (name, description, creditHours, subjectArea, teacherId) VALUES (?, ?, ?, ?, ?)",
            [
              req.body.name,
              req.body.description,
              req.body.creditHours,
              req.body.subjectArea,
              req.body.teacherId,
            ],
            function (err) {
              if (err) {
                console.error(err.message);
                res.status(500).send("Internal Server Error");
                return;
              }
              res.send({});
            },
          );
        } else {
          res.status(401).send("No.");
        }
      }
    },
  );
});

app.post("/register", async (req, res) => {
  const { username, password, isTeacher } = req.body;
  // Hash and salt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  const uuidValue = uuid.v4();
  db.run(
    "INSERT INTO users (username, password, isTeacher, uuid) VALUES (?, ?, ?, ?)",
    [username, hashedPassword, isTeacher, uuidValue],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error registering user" });
      }
      res.json({ message: "User registered successfully" });
    },
  );
});
//login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Error finding user" });
      }

      // Check if the user exists and compare passwords
      if (user && (await bcrypt.compare(password, user.password))) {
        // Use a pre-generated UUID or retrieve it from the user data in the database
        const userId = uuid.v4();

        // Store the UUID in the database
        db.run(
          "UPDATE users SET uuid = ? WHERE username = ?",
          [userId, username],
          (updateErr) => {
            if (updateErr) {
              return res
                .status(500)
                .json({ error: "Error updating user UUID" });
            }

            res.json({
              Id: userId,
              username: user.username,
              isTeacher: user.isTeacher,
            });
          },
        );
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    },
  );
});

app.get("/auth/check", (req, res) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    // No authorization header, user is not authenticated
    res.status(401).send("Unauthorized");
    return;
  }

  // Check if the user is a teacher
  db.get(
    "SELECT isTeacher FROM users WHERE uuid = ?",
    [authorizationHeader],
    (err, row) => {
      if (row && row.isTeacher == 1) {
        // The user is authenticated and is a teacher
        res.send({ authenticated: true, isTeacher: true });
      } else {
        // The user is authenticated but not a teacher
        res.send({ authenticated: true, isTeacher: false });
      }
    },
  );
});

app.post("/checkout", (req, res) => {
  const checkoutcourses = req.body;
  const authorizationHeader = req.headers["authorization"];
  console.log(checkoutcourses);
  db.get(
    "SELECT * FROM users WHERE uuid = ?",
    [authorizationHeader],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Error finding user" });
      }

      const Uusername = user.username;

      // Insert each course into the database
      checkoutcourses.forEach((course) => {
        // Customize this query based on your data structure
        const checkoutquery = `
          INSERT INTO purchases (username, classname, description, creditHours, subjectArea)
          VALUES (?, ?, ?, ?, ?)
        `;

        db.run(
          checkoutquery,
          [
            Uusername,
            course.name,
            course.description,
            course.creditHours,
            course.subjectArea,
          ],
          function (err) {
            if (err) {
              console.error(err.message);
              return res.status(500).json({ error: "Internal Server Error" });
            }

            console.log(`A row has been inserted with rowid ${this.lastID}`);
          },
        );
      });

      res.status(200).json({ message: "Courses inserted successfully" });
    },
  );
});

app.get("/studentclasslist", (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  db.get(
    "SELECT * FROM users WHERE uuid = ?",
    [authorizationHeader],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Error finding user" });
      }
      if (user) {
        db.all(
          "SELECT * FROM purchases WHERE username = ?",
          [user.username],
          async (err, courses) => {
            if (err) {
              return res.status(500).json({ error: "Error finding courses" });
            }
            res.send(courses);
          },
        );
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    },
  );
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
