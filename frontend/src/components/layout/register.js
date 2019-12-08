import React, { Component } from "react";
import {
  withRouter
} from "react-router-dom";
import { Jumbotron, Form, Button, Alert } from "react-bootstrap";
const axios = require("axios");

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    type: 'student',
    error: ''
  }

  register() {
    this.setState({error: ''});
    const user = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      type: this.state.type,
    }
    
    axios.post("http://localhost:3001/api/user", user)
    .then(user => {
      localStorage.setItem('id', user.data.data._id);
      localStorage.setItem('username', user.data.data.username);
      localStorage.setItem('type', user.data.data.type);
      this.props.history.push('/');
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      this.setState({error: err.response ? err.response.data : "Error while creating an account"});
    });
  }

  render() {
    return (
      <Jumbotron>
        <h1>Create an account</h1>
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
            <Form.Group controlId="name" onChange={e => this.setState({ name: e.target.value })}>
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>
            <Form.Group controlId="type" onChange={e => this.setState({ type: e.target.value })}>
              <Form.Label>Login as a</Form.Label>
              <Form.Control as="select">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={() => this.register()}>
              Submit
            </Button>
          </Form>
        </p>
      </Jumbotron>
    );
  }
}

export default RegisterForm;
