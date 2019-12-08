import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import App from "../../App";

class navigationbar extends Component {
  state = {

  };

  constructor(props) {
    super(props);
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('type');
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Navbar bg="light" color="skyblue" expand="lg">
          <Navbar.Brand>EZsched</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {this.props.loggedIn && <>
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {this.props.userType == 'instructor' && <>
                  <Nav.Link href="/add-course">Add Course</Nav.Link>
                </>}
                {this.props.userType == 'student' && <>
                  <Nav.Link href="/select-slots">Select Slots</Nav.Link>
                  <Nav.Link href="/schedule">View Schedule</Nav.Link>
                </>}
              </Nav>
              <Nav>
                <Nav.Link href="/" onClick={() => this.logout()}>Logout</Nav.Link>
              </Nav>
            </>}
            {!this.props.loggedIn && <>
              <Nav className="mr-auto">
                <Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            </>}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default navigationbar;
