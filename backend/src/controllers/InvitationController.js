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
                .populate('event_id')
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

            const { invitation_id } = req.params;

            // get data from body
            const { is_going, address } = req.body;

            //  Find invitation and update
            const invitation = await Invitation.findOneAndUpdate(
                {
                    invitation_id,
                },
                { is_going }
            );

            //Check if invitation exist
            // if (!invitation) {
            //     return res.status(400).json({
            //         errMessage: 'Invitation Not Found',
            //     });
            // }

            if (is_going === true) {
                Event.findOneAndUpdate(
                    { _id: invitation.event_id },
                    {
                        users: [
                            {
                                _id: invitation.user_id,
                                address,
                                role: 'Participant',
                            },
                        ],
                    }
                );

                User.findOneAndUpdate(
                    { cognito_id: userAuth.sub },
                    {
                        events: invitation.event_id,
                    }
                );

                return res.status(200).json({
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
};
