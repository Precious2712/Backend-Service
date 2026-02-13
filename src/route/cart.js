const express = require('express');

const app = express.Router();

const {
    createrUserCart,
    updateCartItemQuantity
} = require('../controller/cart');

const verifyUserWithToken = require('../middleware/verifyUserToken');

app.post('/create-user-cart', verifyUserWithToken, createrUserCart);

app.post('/update-cart-item', verifyUserWithToken, updateCartItemQuantity);

module.exports = app;