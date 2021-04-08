const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send({ message: 'A successful route' });
});

module.exports = routes;
