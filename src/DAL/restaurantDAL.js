import * as q from 'q';
import Restaurant from '../model/restaurant';
import Menu from '../model/menu';
import Feedback from '../model/feedback';
import config from '../configuration/config';
import GrorError from '../utils/grorError';
import { guardInstance, guardAll } from '../utils/guard';

export const getAllRestaurantsPartialData = () => {
    return Restaurant.find({}, config.mongo.defaultMask);
};

export const getRestaurantPartialDataById = (id) => {
    return Restaurant.findOne({ id }, config.mongo.defaultMask)
    .then(guardInstance(`Restaurant with id: ${id} not found`, 404));
};

export const searchRestaurantByName = (restaurantName) => {
    return Restaurant.find({
        name: {
            $regex: new RegExp(restaurantName, 'i') // case insensitive
        }
    }, config.mongo.defaultMask);
};

export const getRestaurantFullDataById = (id) => {
    const basicDataPromise = Restaurant.findOne({ id },config.mongo.defaultMask);
    const menuPromise = Menu.find({restaurantId: id},config.mongo.defaultMask);
    const feedbacksPromise = Feedback.find({restaurantId: id},config.mongo.defaultMask);

    return q.all([basicDataPromise, menuPromise, feedbacksPromise])
    .spread(guardAll([`Restaurant with id: ${id} not found`], [404]))
    .spread((basicData, menu, feedbacks) => {
        return {
            basicData,
            menu,
            feedbacks
        };
    });

};
