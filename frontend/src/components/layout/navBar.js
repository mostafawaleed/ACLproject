import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import App from "../../App";

class navigationbar extends Component {
  state = {
    notifications: [],
    loaded: false
  };

  constructor(props) {
    super(props);
    this.componentDidUpdate();
  }

  componentDidUpdate() {}

  getUnreadNotifications() {
    return this.state.notifications.filter(notif => {
      return !notif.viewed;
    }).length;
  }

  render() {
    return (
      <div>
        <Navbar bg="light" color="skyblue" expand="lg">
          <Navbar.Brand>EZsched</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Add Course</Nav.Link>
              <Nav.Link>Select Slots</Nav.Link>
              <Nav.Link>View Schedule</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default navigationbar;
