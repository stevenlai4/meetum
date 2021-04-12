const express = require('express');
const routes = express.Router();
const verifyToken = require('./config/verifyToken');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');

/////////////////////// User ///////////////////////
// Register user
routes.post('/user/register', verifyToken, UserController.registerUser);

/////////////////////// Event ///////////////////////
// Create event
routes.post('/event', EventController.createEvent);

module.exports = routes;
