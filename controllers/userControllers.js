const User = require("../models/user");

exports.createUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).send("this user already exists");
      }
      User.create(req.body)
        .then(user => {
          return res.json({ data: user });
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: false })
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json({ msg: "User updated", data: user });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
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
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send("User not found");
      return res.json(user);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
};
