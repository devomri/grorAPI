import async from 'async';
import uuid from 'uuid';
import Restaurant from '../model/restaurant';
import Menu from '../model/menu';
import Feedback from '../model/feedback';
import loggerUtil from '../utils/loggerUtil';
import config from '../configuration/config';

function getAllRestaurantsPartialData(callback) {
    Restaurant.find({}, config.mongo.defaultMask , (err, restaurants) => {
        if (err) {
            loggerUtil.logError(`Error in getAllRestaurantsPartialData: ${err}`);

            return callback(err);
        }

        callback(null, restaurants);
    });
}

function searchRestaurantByName(restaurantName, callback) {
    Restaurant.find({
        name: {
            $regex: new RegExp(restaurantName, "i") // case insensitive
        }
    }, config.mongo.defaultMask ,
     (err, restaurantResults) => {
        if (err) {
            loggerUtil.logError(`Error in searchRestaurantByName: ${err}`);

            return callback(err);
        }

        callback(null, restaurantResults);
    },);
}

function getRestaurantFullDataById(restaurantId, finalCallback) {
    var fullRestaurantData = {};

    async.parallel([
        // Restaurant basic data
        (callback) => {
            Restaurant.find({id: restaurantId},config.mongo.defaultMask,
                (err, restaurantResult) => {
                fullRestaurantData.basicData = restaurantResult;
                callback(err);
            });
        },
        // Restaurant's menu
        (callback) => {
            Menu.find({restaurantId: restaurantId},config.mongo.defaultMask,
                (err, menuResult) => {
                fullRestaurantData.manu = menuResult;
                callback(err);
            });
        },
        // Restaurant's feedbacks
        (callback) => {
            Feedback.find({restaurantId: restaurantId},config.mongo.defaultMask ,
                (err, feedbacks) => {
                fullRestaurantData.feedbacks = feedbacks;
                callback(err);
            });
        }
    ], (err) => {
        if (err) {
            loggerUtil.logError(`While retrieving restaurant ${restaurantId} encountered
                                error ${err}`);

            return finalCallback(err);
        }

        finalCallback(null, fullRestaurantData);
    });
}

module.exports.getAllRestaurantsPartialData = getAllRestaurantsPartialData;
module.exports.searchRestaurantByName = searchRestaurantByName;
module.exports.getRestaurantFullDataById = getRestaurantFullDataById;