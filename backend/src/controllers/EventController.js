const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    // Create new event (address is from creator)
    async createEvent(req, res) {
        const { name, date, description, address } = req.body;
        const { cognito_id } = req.headers;

        // Check if the name and event date are filled
        if (!name || !date || !address) {
            return res.status(200).json({
                errMessage: 'All fields must be filled',
            });
        }

        try {
            //Find user if exist
            const user = await User.findOne({ cognito_id });
            if (!user) {
                res.send({ message: 'User Not Found' });
                return;
            }

            // Create a new event to mongodb
            const event = await Event.create({
                name,
                date,
                description,
                users: [{ address, cognito_id }],
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
};
