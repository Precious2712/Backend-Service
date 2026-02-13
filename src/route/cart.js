const express = require('express');

const app = express.Router();

const {
    createrUserCart
} = require('../controller/cart');


app.post('/create-user-cart', createrUserCart);

module.exports = app