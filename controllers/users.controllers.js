const { fetchUsersByUsername } = require("../models/users.model");

exports.sendAllTopics = (req, res) => {
  fetchUsersByUsername().then((users) => {
    res.status(200).send({ users });
  });
};
