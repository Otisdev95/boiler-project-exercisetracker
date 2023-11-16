const express = require('express')
const bodyPaser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyPaser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const users = [];

function generateUserId() {
  return Math.random().toString(36).substring(2, 10);
}

app.post('/api/users', (req, res) => {
  const username = req.body.username;
 
  const newUser = {
    username: username,
    _id: generateUserId()
  }

users.push(newUser);

  return res.json({
    username: newUser.username,
    _id: newUser._id
  });
});

app.get('/api/users', (req, res) => {
  return res.json({ users })
});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})