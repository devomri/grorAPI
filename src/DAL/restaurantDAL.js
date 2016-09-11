import * as q from 'q';
import uuid from 'uuid';
import Restaurant from '../model/restaurant';
import Menu from '../model/menu';
import Feedback from '../model/feedback';
import config from '../configuration/config';

export const getAllRestaurantsPartialData = () => {
    return Restaurant.find({}, config.mongo.defaultMask);
};

export const searchRestaurantByName = (restaurantName) => {
    return Restaurant.find({
        name: {
            $regex: new RegExp(restaurantName, 'i') // case insensitive
        }
    }, config.mongo.defaultMask);
};

export const getRestaurantFullDataById = (restaurantId) => {
    const basicDataPromise = Restaurant.find({id: restaurantId},config.mongo.defaultMask);
    const menuPromise = Menu.find({restaurantId: restaurantId},config.mongo.defaultMask);
    const feedbacksPromise = Feedback.find({restaurantId: restaurantId},config.mongo.defaultMask);

    return q.all([basicDataPromise, menuPromise, feedbacksPromise])
    .spread((basicData, menu, feedbacks) => {
        return {
            basicData,
            menu,
            feedbacks
        };
    });

};
