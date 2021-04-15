import { findCoordinate } from '../network';

const findCentroid = async (users) => {
    let lat_sum = 0;
    let lng_sum = 0;
    const usersArrLen = users.length;

    try {
        // Iteratre through users array and find sums of latitude and longtitude
        for (let i = 0; i < usersArrLen; i++) {
            const response = await findCoordinate(users[i].address);

            lat_sum += response.lat;
            lng_sum += response.lng;
        }

        const result = {
            lat: lat_sum / usersArrLen,
            lng: lng_sum / usersArrLen,
        };

        return result;
    } catch (error) {
        throw error;
    }
};

export default findCentroid;
