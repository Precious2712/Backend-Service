const express = require('express');

const app = express.Router();

const {
    createSnackMenu,
    getAllSnacks
} = require('../controller/snacks');

app.post('/create-snack-menu', createSnackMenu);

app.get('/get-all-snacks', getAllSnacks);

module.exports = app;