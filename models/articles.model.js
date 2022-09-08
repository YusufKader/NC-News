const db = require("../db/connection");

exports.selectArticlesById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((data) => {


      // if (data.rowCount === 0) {
      //   return Promise.reject({
      //     status: 404,
      //     message: "article not found",
      //   });
      // }
      // if (typeof article_id !== "string") {
      //   return Promise.reject({ status: 400, message: "Invalid input" });
      // }

      return data.rows[0];
    });
};
