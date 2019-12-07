import React, { Component } from "react";
import {
  withRouter
} from "react-router-dom";
import { Jumbotron, Form, Button, Alert } from "react-bootstrap";
const axios = require("axios");

class LoginForm extends Component {
  state = {
    username: '',
    type: 'student',
    error: ''
  }

  login() {
    this.setState({error: ''});
    console.log(this.state.username);
    axios.post("http://localhost:3001/api/user/username", {username: this.state.username})
    .then(user => {
      localStorage.setItem('id', user.data);
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('type', this.state.type);
      window.location.reload();
    })
    .catch(err => {
      this.setState({error: 'Incorrect username or password'});
    });
  }

  render() {
    return (
      <Jumbotron>
        <h1>Login to EZsched</h1>
        <p className="py-3">
          {this.state.error != '' &&
            <Alert variant="danger">{this.state.error}</Alert>
          }
          <Form>
            <Form.Group controlId="username" onChange={e => this.setState({ username: e.target.value })}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="password" onChange={e => this.setState({ password: e.target.value })}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group controlId="type" onChange={e => this.setState({ type: e.target.value })}>
              <Form.Label>Login as a</Form.Label>
              <Form.Control as="select">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={() => this.login()}>
              Submit
            </Button>
          </Form>
        </p>
      </Jumbotron>
    );
  }
}

export default LoginForm;
