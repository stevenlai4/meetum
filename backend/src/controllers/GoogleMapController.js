const fetch = require('node-fetch');

module.exports = {
    async getNearbyLocations(req, res) {
        const { lat, lng, locationPref } = req.query;

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=${locationPref.toLowerCase()}&key=${
                    process.env.GOOGLE_API
                }`
            );
            const data = await response.json();

            return res.status(200).json({ locations: data.results });
        } catch (error) {
            throw Error(`Error while finding nearby locations: ${error}`);
        }
    },
    async getLocationPhoto(req, res) {
        const { photoreference } = req.query;

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&maxwidth=400&key=${process.env.GOOGLE_API}`
            );
            if (response) {
                return res.status(200).json({ photo_url: response.url });
            }
        } catch (error) {
            throw Error(`Error while getting location photo: ${error}`);
        }
    },
    async getLocationDetail(req, res) {
        const { place_id } = req.params;

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_API}`
            );
            const data = await response.json();

            if (response) {
                return res.status(200).json({ location_detail: data.result });
            }
        } catch (error) {
            throw Error(`Error while getting location detail: ${error}`);
        }
    },
};
