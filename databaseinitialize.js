const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//this is the variable for the database, it's just "db" in case we need to uncomment DATABASE
const db = new sqlite3.Database("./serverdatabase.db");
// @variables that are inserted into the database when it is first run, makes it less of a pain for replit
const courses = [
  {
    name: "English Composition",
    description: "Learn about English and its composition.",
    creditHours: 3,
    subjectArea: "Language Arts",
    teacherId: 2000,
  },
  {
    name: "Introduction to Mathematics",
    description: "Explore fundamental concepts in mathematics.",
    creditHours: 4,
    subjectArea: "Mathematics",
    teacherId: 2004,
  },
  {
    name: "History of Art",
    description: "Discover the evolution of art throughout history.",
    creditHours: 3,
    subjectArea: "Fine Arts",
    teacherId: 2001,
  },
  {
    name: "Programming Fundamentals",
    description: "Get started with the basics of programming.",
    creditHours: 5,
    subjectArea: "Computer Science",
    teacherId: 2000,
  },
  {
    name: "Environmental Science",
    description:
      "Study the interactions between organisms and their environment.",
    creditHours: 4,
    subjectArea: "Environmental Science",
    teacherId: 2004,
  },
  {
    name: "Introduction to Psychology",
    description: "Learn about the fundamentals of human behavior and the mind.",
    creditHours: 3,
    subjectArea: "Psychology",
    teacherId: 2001,
  },
  {
    name: "Digital Marketing Essentials",
    description: "Understand key concepts in digital marketing strategies.",
    creditHours: 4,
    subjectArea: "Marketing",
    teacherId: 2001,
  },
  {
    name: "Introduction to Astrophysics",
    description: "Explore the wonders of the universe and celestial bodies.",
    creditHours: 5,
    subjectArea: "Astrophysics",
    teacherId: 2003,
  },
  {
    name: "Business Ethics",
    description: "Examine ethical principles in the business world.",
    creditHours: 3,
    subjectArea: "Business Ethics",
    teacherId: 2000,
  },
  {
    name: "Introduction to Sociology",
    description: "Study the structure and dynamics of human society.",
    creditHours: 4,
    subjectArea: "Sociology",
    teacherId: 2003,
  },
];

const teachers = {
  2000: { id: 2000, name: "Professor Smith" },
  2001: { id: 2001, name: "Professor Johnson" },
  2002: { id: 2002, name: "Professor Davis" },
  2003: { id: 2003, name: "Professor Brown" },
  2004: { id: 2004, name: "Professor Wilson" },
};

const users = [
  {
    username: "admin",
    password: "1234",
    isTeacher: true,
    uuid: "null",
  },
];
//courses
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, name TEXT, description TEXT, creditHours INTEGER, subjectArea TEXT, teacherId INTEGER)",
  );

  const insertCourse = db.prepare(
    "INSERT INTO courses (name, description, creditHours, subjectArea, teacherId) VALUES (?, ?, ?, ?, ?)",
  );

  courses.forEach((course) => {
    insertCourse.run(
      course.name,
      course.description,
      course.creditHours,
      course.subjectArea,
      course.teacherId,
    );
  });

  insertCourse.finalize();
});
//teachers
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY, name TEXT)",
  );

  const insertTeacher = db.prepare(
    "INSERT OR REPLACE INTO teachers (id, name) VALUES (?, ?)",
  );

  Object.values(teachers).forEach((teacher) => {
    insertTeacher.run(teacher.id, teacher.name);
  });

  insertTeacher.finalize();
});
//logins
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, isTeacher INTEGER, uuid TEXT)",
  );

  const insertUsers = db.prepare(
    "INSERT OR REPLACE INTO users (id, username, password, isTeacher, uuid) VALUES (?, ?, ?, ?, ?)",
  );

  Object.values(users).forEach((user) => {
    insertUsers.run(user.id, user.username, user.password, user.isTeacher);
  });

  insertUsers.finalize();
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS purchases (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, classname TEXT, description TEXT, creditHours INTEGER, subjectArea TEXT)",
  );
});
