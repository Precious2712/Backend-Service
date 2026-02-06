const express = require('express');

const app = express.Router();

const {
    createMenu,
    getAllMenu
} = require('../controller/menu');

app.post('/createMenu', createMenu);

app.get('/getAllMenu', getAllMenu);


module.exports = app;