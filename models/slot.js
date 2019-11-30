const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SlotSchema = new Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  slotCapacity: {
    type: Number,
    required: true
  }
});
var Slots = mongoose.model("slots", SlotSchema);
module.exports = Slots;
