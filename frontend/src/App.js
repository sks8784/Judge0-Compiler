import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignUp from "./components/LoginSignUp";
import Compiler from "./components/Compiler";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LoginSignUp} />
        <Route exact path="/compiler" Component={Compiler} />
      </Routes>
    </Router>
  )
}

export default App;