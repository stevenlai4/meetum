const jwt_decode = require('jwt-decode');
const Event = require('../models/Event');
const User = require('../models/User');
const Invitation = require('../models/Invitation');

module.exports = {
    // Get all user invitations by user id
    async getInvitationsByUserId(req, res) {
        const userAuth = jwt_decode(req.token);

        try {
            const user = await User.findOne({ cognito_id: userAuth.sub });

            // Check if user exist
            if (!user) {
                return res.status(400).json({
                    errMessage: 'User Not Found',
                });
            }

            const invitations = await Invitation.find({
                user_id: user._id,
                is_going: null,
            })
                .populate({
                    path: 'event_id',
                    populate: { path: 'users._id', select: 'name' },
                })
                .exec();

            return res.status(200).json({
                invitations,
            });
        } catch (error) {
            throw Error(`Error while getting invitation: ${error}`);
        }
    },
    //response To Invitation
    async invitationResponse(req, res) {
        try {
            const userAuth = jwt_decode(req.token);

            // get data from body
            const { is_going, address, invitation_id } = req.body;

            // Check if user enter address if they accept invitation
            if (is_going && !address) {
                return res.status(400).json({
                    errMessage: 'Please enter your location!',
                });
            }

            //  update user response , if they are going or not
            const invitation = await Invitation.findByIdAndUpdate(
                invitation_id,
                { $set: { is_going } },
                { new: true, useFindAndModify: false }
            );

            // add user to event.users array if they accept invitation
            if (is_going) {
                const event = await Event.findByIdAndUpdate(
                    invitation.event_id,
                    {
                        $push: {
                            users: {
                                _id: invitation.user_id,
                                address,
                                role: 'Participant',
                            },
                        },
                    },
                    { new: true, useFindAndModify: false }
                );

                // add event to user.events array if they accept invitation
                await User.findOneAndUpdate(
                    { cognito_id: userAuth.sub },
                    {
                        $push: { events: invitation.event_id },
                    },
                    { useFindAndModify: false }
                );

                return res.status(200).json({
                    event,
                    successMessage: `You have accepted event successfully`,
                });
            } else {
                return res.status(200).json({
                    successMessage: 'You have declined event successfully',
                });
            }
        } catch (e) {
            console.log(e);
        }
    },
    // Get all event invitations by event id
    async getInvitationsByEventId(req, res) {
        const userAuth = jwt_decode(req.token);
        const { event_id } = req.params;

        try {
            const user = await User.findOne({ cognito_id: userAuth.sub });

            // Check if user exist
            if (!user) {
                return res.status(400).json({
                    errMessage: 'User Not Found',
                });
            }

            const event = await Event.findById(event_id);

            if (!event) {
                return res.status(400).json({
                    errMessage: 'Event Not Found',
                });
            }

            const invitations = await Invitation.find({
                event_id: event._id,
                is_going: null,
            })
                .populate('user_id')
                .exec();

            return res.status(200).json({
                invitations,
            });
        } catch (error) {
            throw Error(`Error while getting invitation: ${error}`);
        }
    },
};
