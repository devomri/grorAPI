import uuid from 'uuid';
import * as q from 'q';
import Feedback from '../model/feedback';
import { getUserById } from './userDAL';
import { getRestaurantPartialDataById } from './restaurantDAL';
import { guardAll } from '../utils/guard';

export const insertRestaurantFeedback = (feedbackModel) => {
    const feedbackToAdd = new Feedback({
        id: uuid.v4(),
        restaurantId: feedbackModel.restaurantId,
        userId: feedbackModel.userId,
        feedbackDate: new Date(),
        text: feedbackModel.text,
        rank: feedbackModel.rank
    });

    const userPromise = getUserById(feedbackToAdd.userId);
    const restaurantPromise = getRestaurantPartialDataById(feedbackToAdd.restaurantId);

    // Check the existence of user and restaurant asynchronously
    return q.all([userPromise, restaurantPromise])
        .spread(guardAll(['User was not found, feedback won\'t be inserted', 'Restaurant was not found, feedback won\'t be inserted']))
        .then(() => feedbackToAdd.save());
};

export const removeRestaurantFeedback = (id) => {
    return Feedback.remove({ id });
};

export const updateRestaurantFeedback = ({id, text, rank}) => {
    return Feedback.update({ id }, {
            $set: {
                feedbackDate: new Date(),
                text,
                rank
            }
        });
};
