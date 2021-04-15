const fetch = require('node-fetch');

module.exports = {
    async getNearbyLocations(req, res) {
        const { lat, lng, locationPref } = req.query;

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=${locationPref}&key=${process.env.GOOGLE_API}`
            );
            const data = await response.json();

            return res.status(200).json({ locations: data.results });
        } catch (error) {
            throw Error(`Error while finding nearby locations: ${error}`);
        }
    },
};
