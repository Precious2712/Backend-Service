const express = require('express');

const app = express.Router();

const {
    createrUserCart,
    updateCartItemQuantity,
    getUserCart,
    getAll
} = require('../controller/cart');

const verifyUserWithToken = require('../middleware/verifyUserToken');

app.post('/create-user-cart', verifyUserWithToken, createrUserCart);

app.post('/update-cart-item', verifyUserWithToken, updateCartItemQuantity);

app.get('/get-user-cart', verifyUserWithToken, getUserCart);

app.get('/user/:id', getAll);

module.exports = app;