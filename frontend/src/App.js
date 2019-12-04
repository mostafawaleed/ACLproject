import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import Navigationbar from "./components/layout/navBar";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navigationbar />
          <Switch>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
