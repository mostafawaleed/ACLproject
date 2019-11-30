const Slots = require("../models/slot");

exports.createSlot = (req, res) => {
  //   const another = Slots.findOne({
  //     location: req.body.location,
  //     startTime: req.body.startTime
  //   });
  //   if (another) res.send("this is slot is already occupied");
  Slots.create(req.body)
    .then(slot => {
      if (!slot)
        res.Status(500).send({ err: "error happened while creating the slot" });
      res.json(slot);
    })
    .catch(err => {
      res.json(err.body);
    });
};
exports.findSlot = (req, res) => {
  slot_id = req.params.id;

  Slots.findById(slot_id)
    .then(slot => {
      if (!slot) res.Status(404).send({ err: "this slot is not found" });
      res.json(slot);
    })
    .catch(err => {
      res.json(err.body);
    });
};
exports.deleteSlot = (req, res) => {
  Slot.findByIdAndRemove(req.params.id)
    .then(slot => {
      if (!slot) res.status(404).send({ err: "course not found " });
      res.json(slot);
    })
    .catch(err => {
      res.json(err.body);
    });
};
exports.updateSlot = (req, res) => {
  //   const another = Slots.findOne({
  //     location: req.body.location,
  //     startTime: req.body.startTime
  //   });
  //   if (another) res.send("this is slot is already occupied");
  Slot.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(slot => {
      if (!slot) res.Status(404).send({ err: "this slot is not found" });
      res.json(slot);
    })
    .catch(err => {
      res.json(err.body);
    });
};
