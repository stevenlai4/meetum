const jwt_decode = require('jwt-decode');
const User = require('../models/User');

module.exports = {
    //Get user data
    async getUser(req, res) {
        const userAuth = jwt_decode(req.token);

        try {
            const user = await User.findOne({ cognito_id: userAuth.sub });

            // Check if user exist
            if (!user) {
                return res.status(400).json({
                    errMessage: 'User Not Found',
                });
            }

            return res.status(200).json({
                user,
            });
        } catch (error) {
            throw Error(`Error while getting events: ${error}`);
        }
    },

    // Register a new user
    async registerUser(req, res) {
        const { cognito_id, address, name, email } = req.body;

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
                    email,
                    name,
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
