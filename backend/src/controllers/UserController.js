const User = require('../models/User');
const jwt_decode = require('jwt-decode');

module.exports = {
    // Register a new user
    async registerUser(req, res) {
        const { address } = req.body;
        const userAuth = jwt_decode(req.token);

        // Check if the address input is filled or the default
        // checkout is checked
        if (!address) {
            return res.status(200).json({
                errMessage: 'All fields must be filled',
            });
        }

        try {
            const existentUser = await User.findOne({
                cognito_id: userAuth.sub,
            });

            if (!existentUser) {
                // Create a new user to mongodb
                await User.create({
                    cognito_id: userAuth.sub,
                    username: userAuth.name,
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
