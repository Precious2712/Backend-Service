const express = require('express');

const app = express.Router();

const {
    createMenu
} = require('../controller/menu');

app.post('/createMenu', createMenu);

module.exports = app;