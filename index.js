const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const userSchema = mongoose.Schema({
  username: { type: String, unique: true }
});

const User = mongoose.model('User', userSchema);

const ExerciseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req, res) => {
  const userObj = new User({
    username: req.body.username
  });
  try{
    const user = await userObj.save()
    console.log(user);
    res.json(user);
  }catch (err) {
    console.log(err);
  }
});

// const users = [];

// function generateUserId() {
//   return Math.random().toString(36).substring(2, 10);
// }

// app.post('/api/users', (req, res) => {
//   const username = req.body.username;
 
//   const newUser = {
//     username: username,
//     _id: generateUserId(),
//     exercises: []
//   }

// users.push(newUser);

//   return res.json({
//     username: newUser.username,
//     _id: newUser._id
//   });
// });

// app.get('/api/users', (req, res) => {
//   return res.json(users);
// });

// app.post('/api/users/:_id/exercises', (req, res) => {
//   const userId = req.params._id;
//   const { description, duration } = req.body;

//   if (!description || !duration) {
//     return res.status(400).json({ error: 'Description and duration are required' });
//   }

//   const date = req.body.date ? new Date(req.body.date) : new Date();

//   const newExercise = {
//     description: description,
//     duration: parseInt(duration),
//     date: date.toString()
//   };

//   // Find the user by ID and add the new exercise to their exercises array
//   const userIndex = users.findIndex(user => user._id === userId);

//   if (userIndex === -1) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   users[userIndex].exercises.push(newExercise);

//   return res.json(users[userIndex]);
// });

// app.get('/api/users/:_id/logs', (req, res) => {

// });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})