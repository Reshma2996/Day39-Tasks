const express = require('express');
const mongoose = require('mongoose');
const { Mentor, Student } = require('./models'); // Ensure you have the correct path

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://mailtoreshurr:Guvi123@cluster0.k6azamw.mongodb.net/mentor-student', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// 1. Create Mentor
app.post('/mentors', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    console.log('Mentor saved:', mentor);
    res.status(201).send(mentor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 2. Create Student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    console.log('Student saved:', student);
    res.status(201).send(student);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 3. Get All Mentors
app.get('/mentors', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.send(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 4. Get All Students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
