const request = require('supertest');
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");


beforeEach(() => seed(data));


afterAll(() => {
    if (db.end) db.end();
})

describe('1. GET/api?topics', () => {
  test('status:200, responds with an array of topics objects', () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const {topics} = body;
      expect(topics).toBeInstanceOf(Array);
      expect(topics).toHaveLength(3);
      topics.forEach((topic) => {
        expect(topic).toEqual(
            expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
             })
          );
        })
    });
  });
});