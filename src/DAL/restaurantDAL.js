import Restaurant from '../model/restaurant';
import Menu from '../model/menu';
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
    var fullRestaurantData = {};

    Restaurant.find({id: restaurantId}, (err, restaurantResult) => {
        if (err) {
            loggerUtil.logError(`While retrieving restaurant ${restaurantId} encountered
                                error ${err}`);

            callback(err);
        }

        fullRestaurantData.basicData = restaurantResult;

        Menu.find({restaurantId: restaurantId}, (err, menuResult) => {
            if (err) {
                loggerUtil.logError(`While retrieving restaurant menu of ${restaurantId} encountered
                                error ${err}`);
            }

            fullRestaurantData.menu = menuResult;

            callback(null, fullRestaurantData);
        });
    })
}


module.exports.createNewRestaurant = createNewRestaurant;
module.exports.getRestaurantById = getRestaurantById;