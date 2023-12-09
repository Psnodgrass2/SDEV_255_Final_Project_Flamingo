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
    origin: "https://m07-final-project.phillipsnodgras.repl.co",
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

app.get("/test-session", (req, res) => {
  req.session.userId = "test-user-id";
  res.send("Session set");
});

app.get("/check-session", (req, res) => {
  const userId = req.session.userId;
  res.send(`User ID from session: ${userId}`);
});

app.get("/", (req, res) => {
  res.send("hi");
});

// Retrieve all courses
app.get("/courses", (req, res) => {
  console.log(req.headers["authorization"]);
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader != 1) {
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
});

// Delete a course by ID
app.post("/course/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Deleting course:" + id);
  db.run("DELETE FROM courses WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send({});
  });
});

// Create a new course
app.post("/course/create", (req, res) => {
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
});

app.post("/register", async (req, res) => {
  const { username, password, isTeacher } = req.body;
  console.log(req.session.userId);
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

        // Set the user ID in the session
        req.session.userId = userId;

        try {
          await req.session.save(); // Simply calling save without a callback
        } catch (saveError) {
          console.error("Error saving session:", saveError);
          return res.status(500).json({ error: "Error saving session" });
        }

        res.json({
          Id: userId,
          username: user.username,
          isTeacher: user.isTeacher,
        });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    },
  );
});

app.get("/userinfo", (req, res) => {
  // Assuming userId is stored in the session
  const userId = req.session.userId;
  console.log(userId);
  // Fetch user information from the database or any other source
  // Example using SQLite3
  db.get("SELECT username FROM users WHERE uuid = ?", [userId], (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error retrieving user information" });
    }

    if (user) {
      // Respond with user-specific data, including the username
      const userInfo = {
        userId: userId,
        username: user.username,
      };
      res.json(userInfo);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
