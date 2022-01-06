import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.component.js"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";





function App() {
  return (

    <Router>
      <Navbar/>
      {/*New code below landing */}
      <br/>
      <Routes>
        <Route path="/"  element={<Landing/>} />
        <Route  path="/register" element={<Register/>} />
        <Route  path="/login" element={<Login/>} />
        <Route path="/exercises"  element={<ExercisesList/>} />
        <Route path="/edit/:id" element={<EditExercise/>} />
        <Route path="/create" element={<CreateExercise/>} />
        <Route path="/user" element={<CreateUser/>} />
      </Routes>
  
    </Router>
    
  );
}

export default App;
