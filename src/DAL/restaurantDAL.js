import async from 'async';
import Restaurant from '../model/restaurant';
import Menu from '../model/menu';
import Feedback from '../model/feedback'
import loggerUtil from '../utils/loggerUtil';

function getAllRestaurantsPartialData(callback) {
    Restaurant.find({}, (err, restaurants) => {
        if (err) {
            loggerUtil.logError(`Error in getAllRestaurantsPartialData: ${err}`);

            callback(err);
        }

        callback(null, restaurants);
    });
}

function searchRestaurantByName(restaurantName, callback) {
    Restaurant.find({
        name: {
            $regex: new RegExp(restaurantName, "i") // case insensitive
        }
    }, (err, restaurantResults) => {
        if (err) {
            loggerUtil.logError(`Error in searchRestaurantByName: ${err}`);

            callback(err);
        }

        callback(null, restaurantResults);
    },);
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

module.exports.getAllRestaurantsPartialData = getAllRestaurantsPartialData;
module.exports.searchRestaurantByName = searchRestaurantByName;
module.exports.getRestaurantFullDataById = getRestaurantFullDataById;