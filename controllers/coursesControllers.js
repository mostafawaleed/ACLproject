var Courses = require("../models/courses");
var User = require("../models/user");

exports.createCourse = (req, res) => {
  let { name, instructor, creditHours, Slots } = req.body;
  let course = {};
  course.name = name;
  course.instructor = instructor;
  course.creditHours = creditHours;
  course.Slots = Slots;
  Courses.create(course)
    .then(course => {
      User.findByIdAndUpdate(
        { _id: course.instructor },
        { $push: { courses: course._id } }
      );
    })
    .catch(err => {
      console.log(
        "Internal server error while creating course: \n",
        err,
        "\n\n"
      );
      return res.sendStatus(500);
    });
};
exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  const deletedCourse = await Courses.findByIdAndRemove(courseId);
  if (!deletedCourse) {
    return res.status(404).send({ error: "course not found " });
  }
  const TheInstructor = await User.findById(deletedCourse.instructor);
  if (!TheInstructor) {
    return res.status(404).send({ error: "Instructor not found " });
  }
  const index = TheInstructor.courses.indexOf(courseId);
  var deletedCourse1 = TheInstructor.courses.splice(index, 1);
  await User.findByIdAndUpdate(deletedCourse1.instructor, {
    $pull: { courses: deletedCourse[0] }
  });
};
exports.updateCourse = (req, res) => {
  Courses.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(course => {
      if (!course) return res.status(404).send("course not found");
      return res.json(course);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};
exports.viewCourse = (req, res) => {
  Courses.findById(req.params.id)
    .then(course => {
      if (!course) return res.status(404).send("course not found");
      return res.json(course);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};
