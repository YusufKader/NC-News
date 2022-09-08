const express = require("express");
const { sendAllTopics } = require("./controllers/topics.controllers");
const {
  getArticlesById,
  patchArticlesById,
} = require("./controllers/articles.controllers");
const { sendAllUsers } = require("./controllers/users.controllers");

const app = express();

app.use(express.json());

app.get("/api/topics", sendAllTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/users", sendAllUsers);

app.patch("/api/articles/:article_id", patchArticlesById);

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid data type" });
  } else next(err);
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app;
