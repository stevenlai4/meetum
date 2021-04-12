function verifyToken(req, res, next) {
    const bearerToken = req.header('authorization');

    if (typeof bearerToken !== 'undefined') {
        req.token = bearerToken;
        next();
    } else {
        return res.status(400).json({
            errMessage: 'Invalid token',
        });
    }
}

module.exports = verifyToken;
