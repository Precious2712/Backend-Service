const express = require('express');

const app = express.Router();

const {
    chineeseMenu
} = require('../controller/chineese');

app.post('/chineeseMenu', chineeseMenu);

module.exports = app;