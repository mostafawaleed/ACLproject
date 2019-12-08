import React, { Component } from "react";
import { Badge, Button, Form, Col, Container, Alert, Card, ListGroup } from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class Schedule extends Component {
  state = {
    slots: [],
    loading: true
  };

  getTimeStr(time) {
    return time.replace('T', ' ').replace('Z', '').replace('.000', '');
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/user/" + localStorage.getItem("id"))
    .then(res => {
      this.setState({ slots: res.data.enrolledSlots, loading: false });
    })
    .catch(err => {
      console.log(err.body);
    });
  };

  render() {
    return (
      <Container>
        {this.state.loading &&
          <Alert variant="secondary">Loading schedule...</Alert>
        }
        {this.state.slots.map(pair => (
          <Card style={{marginTop: '10px', marginBottom: '10px'}}>
            <Card.Header>
              <Card.Title>{pair.course.name}</Card.Title>
              <Card.Subtitle className="text-muted">{pair.course.creditHours} credit hours</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <b>Time:</b> From {this.getTimeStr(pair.slot.startTime)} to {this.getTimeStr(pair.slot.endTime)}<br />
              <b>Location: </b> {pair.slot.location}<br />
            </Card.Body>
          </Card>
        ))}
      </Container>
    );
  }
}
export default Schedule;
