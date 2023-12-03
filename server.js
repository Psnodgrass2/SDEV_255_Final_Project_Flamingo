const express = require('express')
const app = express();
const port = 3000;

app.use(require('cors')())

// @todo will be in database but just for initial purposes
const DATABASE = {
  courses: [
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
      description:
        "Learn about the fundamentals of human behavior and the mind.",
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
  ],
  teachers: {
    2000: { id: 2000, name: 'Professor Smith' },
    2001: { id: 2001, name: 'Professor Johnson' },
    2002: { id: 2002, name: 'Professor Davis' },
    2003: { id: 2003, name: 'Professor Brown' },
    2004: { id: 2004, name: 'Professor Wilson' },  
  }
};

app.get('/', (req, res) => {
  res.send('hi');
})

app.get('/courses', (req, res) => {
  res.send(DATABASE.courses)
})

app.get('/course/:id', (req, res) => {
  if (DATABASE.courses[req.params.id]) {
    res.send(DATABASE.courses[req.params.id])
  } else {
    res.status(404).send({})
  }
})

app.listen(port, () => console.log(`App running at http://localhost:${port}`))
