const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));

afterAll(() => {
  return db.end();
});

describe("1. GET/api?topics", () => {
  test("status:200, responds with an array of topics objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toBeInstanceOf(Array);
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: return an object of articles", () => {
    const ARTICLE_ID = 3;
    return request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: ARTICLE_ID,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
        });
      });
  });
  test("status: 400, responds with a invalid input", () => {
    const ARTICLE_ID = "not a number";
    return request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("Invalid data type");
      });
  });
  test("status:404, article not found", () => {
    const ARTICLE_ID = 1000;
    return request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("Article not found");
      });
  });
});

describe("1. GET/api?users", () => {
  test("status:200, responds with an array of users objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("status:200, responds with an updated article", () => {
    const articleUpdate = {
      inc_votes: 3,
  };
    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 103,
        });
      });
  });
  test("status:200, responds with no updated votes when a vote of 0 is passed ", () => {
    const articleUpdate = {
      inc_votes: 0,
  };
    return request(app)
      .patch("/api/articles/3")
      .send(articleUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
        });
      });
  });

   test("status:404, article not found", () => {
     const ARTICLE_ID = 1000;
     return request(app)
     .patch(`/api/articles/${ARTICLE_ID}`)
     .expect(404)
     .then(({ body }) => {
       const { message } = body;
       expect(message).toEqual("Article not found");
      });
    });
    
    test("status: 400, responds with a invalid input", () => {
      const ARTICLE_ID = "not a number";
      return request(app)
        .patch(`/api/articles/${ARTICLE_ID}`)
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toEqual("Invalid data type");
        });
    });
});
