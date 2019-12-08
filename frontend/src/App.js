import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import courseCreation from "./components/layout/courseCreation";
import { Button, Container } from "react-bootstrap";
import Navigationbar from "./components/layout/navBar";
import LoginForm from "./components/layout/login";
import SelectSlots from "./components/layout/selectSlots";
import Schedule from "./components/layout/schedule";
import RegisterForm from "./components/layout/register";

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
            <Navigationbar loggedIn={this.state.loggedIn} userType={this.state.type} />
            <Container>
              {this.state.loggedIn &&
                <Switch>
                  <Route exact path="/add-course" component={courseCreation} />
                  <Route exact path="/select-slots" component={SelectSlots} />
                  <Route exact path="/schedule" component={Schedule} />
                </Switch>
              }
              {!this.state.loggedIn &&
                <Switch>
                  <Route exact path="/" component={LoginForm} />
                  <Route exact path="/register" component={RegisterForm} />
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
