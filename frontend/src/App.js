import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import courseCreation from "./components/layout/courseCreation";
import { Button } from "react-bootstrap";
import Navigationbar from "./components/layout/navBar";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navigationbar />
        </div>
        <Route exact path="/add-course" component={courseCreation} />
      </Router>
    </div>
  );
}

export default App;
