const express = require ('express');
const { sendAllTopics } = require('./controllers/topics.controllers');
const db = require('./db/connection');
const { topicData } = require('./db/data/test-data');

const app = express ();

app.get('/api/topics', sendAllTopics) 

module.exports = app;