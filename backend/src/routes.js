const express = require('express');
const routes = express.Router();
const verifyToken = require('./config/verifyToken');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const InvitationController = require('./controllers/InvitationController');
const GoogleMapController = require('./controllers/GoogleMapController');

/////////////////////// User ///////////////////////
// Register user
routes.post('/user/register', UserController.registerUser);

/////////////////////// Event ///////////////////////
// Create event
routes.post('/event', verifyToken, EventController.createEvent);
// Get all events
routes.get('/events', verifyToken, EventController.getAllEvents);
// Get an event by event id
routes.get('/event/:event_id', verifyToken, EventController.getEventById);
// Update an event location
routes.post(
    '/update_location/:event_id',
    verifyToken,
    EventController.updateEventLocation
);

/////////////////////// Invitation ///////////////////////
// Get invitations by event id
routes.get(
    '/:event_id/invitations',
    verifyToken,
    InvitationController.getInvitationsByEventId
);

/////////////////////// Google Map API ///////////////////////
// Get nearby locations
routes.get(
    '/google/nearby',
    verifyToken,
    GoogleMapController.getNearbyLocations
);
// Get location photo
routes.get(
    '/google/location_photo',
    verifyToken,
    GoogleMapController.getLocationPhoto
);

module.exports = routes;
