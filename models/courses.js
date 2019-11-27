const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  instructor: {
    type: Schema.ObjectId,
    ref: "user"
  },
  creditHours: {
    type: Number,
    required: true
  },
  Slots: [
    {
      type: Schema.ObjectId,
      ref: "slots"
    }
  ]
});

var Course = mongoose.model("course", CourseSchema);
module.exports = Course;
