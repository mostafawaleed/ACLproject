const User = require("../models/user");
const Slots = require("../models/slot");

exports.createUser = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) return res.send("this username is already taken");
      User.create(req.body)
        .then(user => {
          console.log(user);
          return res.json({ data: user });
        })
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .catch(err => {
      return res.status(500).send(err.body);
    });
};
exports.updateUser = (req, res) => {
  User.findOne(req.body.username)
    .then(user => {
      if (user) return res.send("this username is already taken");
      User.findByIdAndUpdate(req.params.id, req.body, { new: false })
        .then(user => {
          if (!user) return res.status(404).send("User not found");
          return res.json({ msg: "User updated", data: user });
        })
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .then(err => {
      return res.status(500).send(err);
    });
};
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json({ msg: "User deleted", data: user });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};
exports.getUser = (req, res) => {
  User.findById(req.params.id).populate('enrolledSlots.course').populate('enrolledSlots.slot')
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json(user);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};
exports.getUserbyusername = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json(user._id);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};

exports.enrollUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.user, {
      $push: {enrolledSlots: {course: req.body.course, slot: req.body.slot}}
    });
    await Slots.findByIdAndUpdate(req.body.slot, {
      $inc: {slotCapacity: -1}
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err.body);
  }
};