const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

/////////////////////// User ///////////////////////
// Register user
routes.post('/user/register', UserController.registerUser);

module.exports = routes;
