const User = require('../models/User');

module.exports = {
    // Register a new user
    async registerUser(req, res) {
        const { address } = req.body;
        const { username, cognito_id } = req.headers;

        // Check if the address input is filled or the default
        // checkout is checked
        if (!address) {
            return res.status(200).json({
                errMessage: 'All fields must be filled',
            });
        }

        try {
            const existentUser = await User.findOne({ cognito_id });

            if (!existentUser) {
                // Create a new user to mongodb
                await User.create({
                    cognito_id,
                    username,
                    address,
                    events: [],
                });

                return res.status(200).json({
                    successMessage: 'User registered successfully',
                });
            }

            return res.status(400).json({
                errMessage: 'User already exists',
            });
        } catch (error) {
            throw Error(`Error while registering a new user: ${error}`);
        }
    },
};
