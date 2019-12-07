import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import courseCreation from "./components/layout/courseCreation";
import { Button, Container } from "react-bootstrap";
import Navigationbar from "./components/layout/navBar";
import LoginForm from "./components/layout/login";

class App extends React.Component {
  state = {
    loggedIn: false,
    username: '',
    type: 'student'
  }

  componentDidMount() {
    var username = localStorage.getItem('username');
    var type = localStorage.getItem('type');
    if (username) {
      this.setState({
        loggedIn: true,
        username: username,
        type: type
      });
    } else {
      this.setState({
        loggedIn: false,
        username: '',
        type: ''
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigationbar loggedIn={this.state.loggedIn} />
            <Container>
              {this.state.loggedIn &&
                <Switch>
                  <Route exact path="/add-course" component={courseCreation} />
                </Switch>
              }
              {!this.state.loggedIn &&
                <Switch>
                  <Route path="/" component={LoginForm} />
                </Switch>
              }
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
