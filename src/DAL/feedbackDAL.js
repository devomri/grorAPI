import uuid from 'uuid';
import Feedback from '../model/feedback';
import * as loggerUtil from '../utils/loggerUtil';
import config from '../configuration/config';

export const insertRestaurantFeedback = (feedbackModel, callback) => {
    const feedbackToAdd = new Feedback({
        id: uuid.v4(),
        restaurantId: feedbackModel.restaurantId,
        userId: feedbackModel.userId,
        feedbackDate: new Date(),
        text: feedbackModel.text,
        rank: feedbackModel.rank
    });

    feedbackToAdd.save((err) => {
        if (err) {
            loggerUtil.logError(`Error in insertRestaurantFeedback: ${err}`);
        }

        callback(err);
    });
};

export const removeRestaurantFeedback = (feedbackId, callback) => {
    Feedback.remove({id: feedbackId}, (err) => {
        if (err) {
            loggerUtil.logError(`Error in removeRestaurantFeedback: ${err}`);
        }

        callback(err);
    });
};

export const updateRestaurantFeedback = (feedbackId, feedbackNewText, feedbackNewRank, callback) => {
    Feedback.update({id: feedbackId}, {
            $set: {
                feedbackDate: new Date(),
                text: feedbackNewText,
                rank: feedbackNewRank
            }
        }, (err) => {
                if (err) {
                    loggerUtil.logError(`Error in updateRestaurantFeedback: ${err}`);
                }

                callback(err);
    });
};
