import async from 'async';
import Restaurant from '../model/restaurant';
import Menu from '../model/menu';
import Feedback from '../model/feedback'
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

function getRestaurantFullDataById(restaurantId, finalCallback) {
    var fullRestaurantData = {};

    async.parallel([
        // Restaurant basic data
        (callback) => {
            Restaurant.find({id: restaurantId}, (err, restaurantResult) => {
                fullRestaurantData.basicData = restaurantResult;
                callback(err);
            });
        },
        // Restaurant's menu
        (callback) => {
            Menu.find({restaurantId: restaurantId}, (err, menuResult) => {
                fullRestaurantData.manu = menuResult;
                callback(err);
            });
        },
        // Restaurant's feedbacks
        (callback) => {
            Feedback.find({}, (err, feedbacks) => {
                loggerUtil.logDebug(`feedbacks: ${feedbacks}`);
                fullRestaurantData.feedbacks = feedbacks;
                callback(err);
            });
        }
    ], (err) => {
        if (err) {
            loggerUtil.logError(`While retrieving restaurant ${restaurantId} encountered
                                error ${err}`);

            finalCallback(err);
        }

        finalCallback(null, fullRestaurantData);
    });
}


module.exports.createNewRestaurant = createNewRestaurant;
module.exports.getRestaurantFullDataById = getRestaurantFullDataById;