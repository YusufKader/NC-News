const { fetchUsersByUsername } = require("../models/users.model");

exports.sendAllUsers = (req, res) => {
  fetchUsersByUsername().then((users) => {
    res.status(200).send({ users });
  });
};
