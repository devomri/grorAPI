import loggerUtil from '../utils/loggerUtil';
import Organization from '../model/organization'

function getAllRestaurants(callback) {
    Organization.find({}, (err, organizations) => {
        if (err) {
            loggerUtil.logError(`getAllRestaurants got an error: ${err}`);

            callback(err);
        }

        callback(err, organizations);
    });
}

module.exports.getAllRestaurants = getAllRestaurants;