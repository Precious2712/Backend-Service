const express = require('express');

const app = express.Router();

const {
    createrUserCart
} = require('../controller/cart');

const verifyUserWithToken = require('../middleware/verifyUserToken');

app.post('/create-user-cart', verifyUserWithToken, createrUserCart);

module.exports = app;