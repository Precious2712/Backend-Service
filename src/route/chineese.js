const express = require('express');

const app = express.Router();

const {
    chineeseMenu,
    getChineeseMeal
} = require('../controller/chineese');

app.post('/chineeseMenu', chineeseMenu);

app.get('/chineese-foods', getChineeseMeal);

module.exports = app;