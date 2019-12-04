const User = require("../models/user");

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