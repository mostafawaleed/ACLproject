const Slots = require("../models/slot");

exports.createSlot = (req, res) => {
  console.log(req.body);
  Slots.findOne({
    location: req.body.location,
    startTime: req.body.startTime
  })
    .then(another => {
      if (another)
        return res.status(400).send("this is slot is already occupied");
      Slots.create(req.body)
        .then(slot => {
          if (!slot)
            return res
              .status(500)
              .send({ err: "error happened while creating the slot" });
          res.json(slot);
        })
        .catch(err => {
          res.status(500).json(err.body);
        });
    })
    .catch(err => {
      res.status(500).json(err.body);
    });
};
exports.findSlot = (req, res) => {
  slot_id = req.params.id;

  Slots.findById(slot_id)
    .then(slot => {
      if (!slot) res.status(404).send({ err: "this slot is not found" });
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
  Slots.findOne({
    location: req.body.location,
    startTime: req.body.startTime
  })
    .then(another => {
      if (another) res.send("this is slot is already occupied");
      Slots.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(slot => {
          if (!slot) res.status(404).send({ err: "this slot is not found" });
          res.json(slot);
        })
        .catch(err => {
          res.json(err.body);
        });
    })
    .catch(err => {
      res.status(500).send(err.body);
    });
};
