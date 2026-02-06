const express = require('express');

const app = express.Router();

const {
    createUser,
    signInUsers,
} = require('../controller/user');

const userToken = require('../middleware/verifyUserToken');

app.post('/create-user', createUser);

app.post('/sign-in-user', signInUsers);

module.exports = app;