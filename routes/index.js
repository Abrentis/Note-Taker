// Starting /api pathway
const express = require('express');
const dbRouter = require('./db');
const app = express();

// ---> /api/notes
app.use('/notes', dbRouter);

module.exports = app;