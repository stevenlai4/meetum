// Create express application
const express = require('express');

// Create app
const app = express();

// Enable cors
const cors = require('cors');
app.use(cors());

// Create PORT
// Deployed: process.env.PORT
// Development: 8080
const PORT = process.env.PORT || 8080;

// If starting the server as a development environment then it's
// going to import dotenv extension
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Access routes
const routes = require('./routes');
app.use(routes);

// Setup mongoose
const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
} catch (error) {
    console.error(error);
}

// express.json() returns a middleware that pass json as a response
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
