const db = require("../db/connection");

exports.selectArticlesById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {
      return data.rows[0];
    });
};

exports.newArticleById = (article_id, inc_votes) => {
  const varArr = [inc_votes, article_id];
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      varArr
    )
    .then((result) => {
      return result.rows[0];
    });
};
