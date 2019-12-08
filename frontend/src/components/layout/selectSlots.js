import React, { Component } from "react";
import { Badge, Button, Form, Col, Container, Alert, Card, ListGroup } from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

class SelectSlots extends Component {
  state = {
    courses: [],
    loading: true
  };

  getTimeStr(time) {
    return time.replace('T', ' ').replace('Z', '').replace('.000', '');
  }

  enroll(courseId, slotId) {
    const userId = localStorage.getItem('id');

    axios.post("http://localhost:3001/api/user/enroll", {
      user: userId, course: courseId, slot: slotId
    })
    .then(res => {
      this.props.history.push('/schedule');
    });
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/course")
    .then(res => {
      this.setState({ courses: res.data, loading: false });
    })
    .catch(err => {
      console.log(err.body);
    });
  };

  render() {
    return (
      <Container>
        {this.state.loading &&
          <Alert variant="secondary">Loading courses...</Alert>
        }
        {this.state.courses.map(course => (
          <Card style={{marginTop: '10px', marginBottom: '10px'}}>
            <Card.Header>
              <Card.Title>{course.name}</Card.Title>
              <Card.Subtitle className="text-muted">{course.creditHours} credit hours</Card.Subtitle>
            </Card.Header>
            <ListGroup variant="flush">
              {course.Slots.length == 0 &&
                <ListGroup.Item>No slots are available for this course.</ListGroup.Item>
              }
              {course.Slots.map(slot => (
                <ListGroup.Item>
                  <b>Time:</b> From {this.getTimeStr(slot.startTime)} to {this.getTimeStr(slot.endTime)}<br />
                  <b>Location: </b> {slot.location}<br />
                  <b>Available capacity: </b> {slot.slotCapacity}<br />
                  {slot.slotCapacity > 0 &&
                    <a href="javascript:;" onClick={() => this.enroll(course._id, slot._id)}>Enroll</a>
                  }
                  {slot.slotCapacity == 0 &&
                    <span className="text-muted">Slot capacity is full</span>
                  }
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ))}
      </Container>
    );
  }
}
export default SelectSlots;
