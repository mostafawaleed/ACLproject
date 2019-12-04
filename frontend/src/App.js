import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import Navigationbar from "./components/layout/navBar";

function App() {
  return (
    <div className="App">
      <Navigationbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="outline-success">Success</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
