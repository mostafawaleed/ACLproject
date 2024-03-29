const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["student", "instructor"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  courses: [
    {
      type: Schema.ObjectId,
      ref: "course"
    }
  ],
  enrolledSlots: [new Schema({
    course: {
      type: Schema.ObjectId,
      ref: "course"
    },
    slot: {
      type: Schema.ObjectId,
      ref: "slots"
    }
  }, { noId: true })]
});
var User = mongoose.model("user", UserSchema);
module.exports = User;
