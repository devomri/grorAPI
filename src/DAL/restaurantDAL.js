import Restaurant from '../model/restaurant';
import loggerUtil from '../utils/loggerUtil';

function createNewRestaurant(resName) {
    let res1 = new Restaurant({
        name: resName
    });

    res1.save((err) => {
        if (err)
            loggerUtil.logError(err);
    });
}

function getRestaurantById(restaurantId, callback) {
    Restaurant.find({id: restaurantId}, (err, restaurantResult) => {
        if (err) {
            loggerUtil.logError(`While retrieving restaurant ${restaurantId} encoutered
                                error ${err}`);
        }

        loggerUtil.logDebug(`got res id: ${restaurantId}`);

        callback(restaurantResult);
    })
}

module.exports.createNewRestaurant = createNewRestaurant;
module.exports.getRestaurantById = getRestaurantById;