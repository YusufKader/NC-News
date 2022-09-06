const { fetchTopicBySlug  } = require('../models/topics.model');

exports.sendAllTopics = (req, res) => {
  fetchTopicBySlug ()
    .then(topics => {
      res.status(200).send({ topics });
    })
};