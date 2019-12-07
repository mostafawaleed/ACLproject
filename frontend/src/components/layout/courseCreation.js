import React, { Component } from "react";
import { Badge, Button, Form, Col, Container } from "react-bootstrap";
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");
class CourseCreate extends Component {
  state = {
    name: "",
    instructor: "",
    credithours: "",
    starttime1: "",
    starttime2: "",
    starttime3: "",
    endtime1: "",
    endtime2: "",
    endtime3: "",
    location1: "",
    location2: "",
    location3: "",
    cap1: "",
    cap2: "",
    cap3: "",
    error: "",
    done: 0,

    courseinfo: []
  };
  componentDidMount() {
    axios
      .get("https://api.mockaroo.com/api/cd7d21e0?count=50&key=78e63b20")
      .then(courseinfo => {
        this.setState({ courseinfo: courseinfo.data });
      });
  }
  createcourse = () => {
    this.setState({ done: 0 });
    axios
      .post("http://localhost:3001/api/slot", {
        startTime: this.state.starttime1,
        endTime: this.state.endtime1,
        location: this.state.location1,
        slotCapacity: this.state.cap1
      })
      .then(slot1 => {
        axios
          .post("http://localhost:3001/api/slot", {
            startTime: this.state.starttime2,
            endTime: this.state.endtime2,
            location: this.state.location2,
            slotCapacity: this.state.cap2
          })
          .then(slot2 => {
            axios
              .post("http://localhost:3001/api/slot", {
                startTime: this.state.starttime3,
                endTime: this.state.endtime3,
                location: this.state.location3,
                slotCapacity: this.state.cap3
              })
              .then(slot3 => {
                axios
                  .post("http://localhost:3001/api/course", {
                    name: this.state.name,
                    instructor: localStorage.getItem("username"),
                    creditHours: this.state.credithours,
                    Slots: [slot1.data._id, slot2.data._id, slot3.data._id]
                  })
                  .then(s => {
                    this.setState({ done: 1 });
                  })
                  .catch(e => {
                    this.setState({ error: e });
                  });
              });
          });
      })
      .catch(e => {
        this.setState({ error: e });
      });
  };
  render() {
    return (
      <Container>
        ]
        <span
          style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
          className="badge"
        >
          Course Form
        </span>
        <Form>
          <Form.Group controlId="Coursename">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              as="select"
              onChange={e => {
                this.setState({
                  name:
                    "CSEN" + this.state.courseinfo[e.target.value].coursecode,
                  credithours: this.state.courseinfo[e.target.value].credithours
                });
              }}
            >
              <option />
              {this.state.courseinfo.map((course, i) => {
                return <option value={i}>{"CSEN " + course.coursecode}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <span
            style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
            className="badge"
          >
            1stSlot
          </span>
          <Form.Row>
            <Form.Group as={Col} controlId="Start Time">
              <Form.Label>start time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={this.state.starttime1}
                onChange={e => {
                  this.setState({ starttime1: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="end time">
              <Form.Label>end time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={this.state.endtime1}
                onChange={e => {
                  this.setState({ endtime1: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                value=""
                value={this.state.location1}
                onChange={e => {
                  this.setState({ location1: e.target.value });
                }}
              >
                <option />
                <option>H1</option>
                <option>H2</option>
                <option>H3</option>
                <option>H4</option>
                <option>H5</option>
                <option>H6</option>
                <option>H7</option>
                <option>H8</option>
                <option>H9</option>
                <option>H10</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="slots capacity">
              <Form.Label>slot capacity</Form.Label>
              <Form.Control
                type="textarea"
                onChange={e => {
                  this.setState({ cap1: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Row>
          <span
            style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
            className="badge"
          >
            2stSlot
          </span>
          <Form.Row>
            <Form.Group as={Col} controlId="Start Time">
              <Form.Label>start time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={this.state.starttime2}
                onChange={e => {
                  this.setState({ starttime2: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="end time">
              <Form.Label>end time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={this.state.endtime2}
                onChange={e => {
                  this.setState({ endtime2: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                value={this.state.location2}
                onChange={e => {
                  this.setState({ location2: e.target.value });
                }}
              >
                <option />
                <option>H1</option>
                <option>H2</option>
                <option>H3</option>
                <option>H4</option>
                <option>H5</option>
                <option>H6</option>
                <option>H7</option>
                <option>H8</option>
                <option>H9</option>
                <option>H10</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="slots capacity">
              <Form.Label>slot capacity</Form.Label>
              <Form.Control
                type="textarea"
                onChange={e => {
                  this.setState({ cap2: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Row>
          <span
            style={{ fontSize: 30, fontWeight: "italic", color: "steelblue " }}
            className="badge"
          >
            3stSlot
          </span>
          <Form.Row>
            <Form.Group as={Col} controlId="Start Time">
              <Form.Label>start time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={this.state.starttime3}
                onChange={e => {
                  this.setState({ starttime3: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="end time">
              <Form.Label>end time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={this.state.endtime3}
                onChange={e => {
                  this.setState({ endtime3: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                value={this.state.location3}
                onChange={e => {
                  this.setState({ location3: e.target.value });
                }}
              >
                <option />
                <option>H1</option>
                <option>H2</option>
                <option>H3</option>
                <option>H4</option>
                <option>H5</option>
                <option>H6</option>
                <option>H7</option>
                <option>H8</option>
                <option>H9</option>
                <option>H10</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="slots capacity">
              <Form.Label>slot capacity</Form.Label>
              <Form.Control
                type="textarea"
                onChange={e => {
                  this.setState({ cap3: e.target.value });
                }}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" onClick={this.createcourse}>
            Create Course
          </Button>
        </Form>
      </Container>
    );
  }
}
export default CourseCreate;
