const router = require('express').Router();
let User = require('../models/user.model');

// find() is a mongoose method that is going to get all the user in the atlas db
// the res is sent to json
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// post requests
router.route('/add').post((req, res) => {
  const username = req.body.username;

  // create new instance of user using the username
  const newUser = new User({username});

  // new user is saved to db
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;