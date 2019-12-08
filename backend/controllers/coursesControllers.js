var Courses = require("../models/courses");
var User = require("../models/user");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find().populate('Slots');
    return res.json(courses);
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.createCourse = async (req, res) => {
  const another = await Courses.findOne({ name: req.body.name });
  if (another) return res.send("this name is already taken");
  const course = await Courses.create(req.body);
  const instructor = await User.findOneAndUpdate(
    { _id: course.instructor },
    { $push: { courses: course._id } }
  );
  return res.json({ course: course });
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
  console.log(index);
  var deletedCourse1 = TheInstructor.courses.splice(index, 1);
  console.log(deletedCourse1);
  const deletedFromUser = await User.findByIdAndUpdate(
    deletedCourse.instructor,
    {
      $pull: { courses: deletedCourse1[0] }
    }
  );
  res.json(deletedFromUser);
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
