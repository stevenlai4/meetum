const jwt_decode = require('jwt-decode');
const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    // Create new event (address is from creator)
    async createEvent(req, res) {
        const { name, date, description, address, locationPref } = req.body;
        const userAuth = jwt_decode(req.token);

        // Check if the name and event date are filled
        if (!name || !date || !address || !locationPref) {
            return res.status(400).json({
                errMessage: 'All fields must be filled',
            });
        }

        try {
            //Check if user exist
            const user = await User.findOne({ cognito_id: userAuth.sub });
            if (!user) {
                return res.status(400).json({
                    errMessage: 'User Not Found',
                });
            }

            //Create a new event to mongodb
            const event = await Event.create({
                name,
                date,
                description,
                locationPref,
                users: [
                    {
                        address,
                        _id: user._id,
                        role: 'Organiser',
                        is_going: true,
                    },
                ],
            });

            //Push event in events array of user (user.events)
            user.events.push(event);

            //update/save user in the database
            await user.save();

            return res.status(200).json({
                successMessage: 'Created event successfully',
            });
        } catch (error) {
            throw Error(`Error while creating a new event: ${error}`);
        }
    },
    // Get all user events by user id
    async getAllEvents(req, res) {
        const userAuth = jwt_decode(req.token);

        try {
            const user = await User.findOne({ cognito_id: userAuth.sub })
                .populate('events')
                .exec();

            // Check if user exist
            if (!user) {
                return res.status(400).json({
                    errMessage: 'User Not Found',
                });
            }

            return res.status(200).json({
                events: user.events,
            });
        } catch (error) {
            throw Error(`Error while getting events: ${error}`);
        }
    },
    // Get an event by event id
    async getEventById(req, res) {
        const { event_id } = req.params;
        const userAuth = jwt_decode(req.token);

        try {
            const event = await Event.findById({ _id: event_id })
                .populate({
                    path: 'users._id',
                    select: 'name address -_id',
                })
                .exec();

            // Check if the event exists
            if (event) {
                const user = await User.findOne({
                    $and: [
                        { cognito_id: userAuth.sub },
                        { events: { $in: [event_id] } },
                    ],
                });

                // Check if the event belongs to the user
                if (user) {
                    return res.status(200).json({
                        event,
                    });
                } else {
                    return res.status(400).json({
                        errMessage: 'Event not found',
                    });
                }
            } else {
                return res.status(400).json({
                    errMessage: 'Event does not exist',
                });
            }
        } catch (error) {
            throw Error(`Error while getting event: ${error}`);
        }
    },
};
