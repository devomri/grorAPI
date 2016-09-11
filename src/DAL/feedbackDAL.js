import uuid from 'uuid';
import * as q from 'q';
import Feedback from '../model/feedback';
import { getUserById } from './userDAL';
import { getRestaurantFullDataById } from './restaurantDAL';
import * as loggerUtil from '../utils/loggerUtil';

export const insertRestaurantFeedback = (feedbackModel) => {
    const feedbackToAdd = new Feedback({
        id: uuid.v4(),
        restaurantId: feedbackModel.restaurantId,
        userId: feedbackModel.userId,
        feedbackDate: new Date(),
        text: feedbackModel.text,
        rank: feedbackModel.rank
    });

    const userExistsPromise = getUserById(feedbackToAdd.userId);
    const restaurantExistsPromise = getRestaurantFullDataById(feedbackToAdd.restaurantId);

    // Check the existence of user and restaurant asynchronously
    return q.all([userExistsPromise, restaurantExistsPromise])
        .spread((user, restaurant) => {
            if (!user) {
                throw new Error("User was not found, feedback won't be inserted");
            } else if (!restaurant || restaurant.basicData.length == 0) {
                throw new Error("User was not found, feedback won't be inserted");
            } else {
                return feedbackToAdd.save();
            }
        });
};

export const removeRestaurantFeedback = (feedbackId) => {
    return Feedback.remove({id: feedbackId});
};

export const updateRestaurantFeedback = (feedback) => {
    return Feedback.update({id: feedback.id}, {
            $set: {
                feedbackDate: new Date(),
                text: feedback.text,
                rank: feedback.rank
            }
        });
};
