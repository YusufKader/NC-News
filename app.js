const express = require("express");
const { sendAllTopics } = require("./controllers/topics.controllers");
const { getArticlesById } = require("./controllers/articles.controllers");

const app = express();

app.get("/api/topics", sendAllTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).send({ message: err.message });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid data type" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Article not found" });
  } else next(err);

  return res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app;
