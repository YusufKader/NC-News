const {
  selectArticlesById,
  newArticleById,
} = require("../models/articles.model");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {

      if (article === undefined) {
        return Promise.reject({ status: 404, message: "Article not found" });
      }
      res.status(200).send({ article });
    })

    .catch((err) => {
      next(err);
    });
};

exports.patchArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  newArticleById(article_id, inc_votes)
    .then((article) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, message: "Article not found" });

      }
      res.status(200).send({ article });
    })

    .catch((err)=>{
      next(err)

    });
};
