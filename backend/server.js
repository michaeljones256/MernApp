const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open',()=> {
  console.log("MongoDB database connection established sucessfully");
})

// these endpoints will be stored behind /exercises/..
const exercisesRouter = require('./routes/exercises')
// these endpoints will be stored behind /users/..
// nNEW const usersRouter = require('./routes/users')

//NEW
const users = require("./routes/Login/Users");
//END

app.use('/exercises', exercisesRouter);
//app.use('/users', usersRouter);


//NEW STUFF below
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
// END

app.listen(port,() => {
  console.log(`server is running on port: ${port}`);
})