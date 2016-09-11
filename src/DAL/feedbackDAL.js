import uuid from 'uuid';
import Feedback from '../model/feedback';
import config from '../configuration/config';

export const insertRestaurantFeedback = (feedbackModel) => {
    const feedbackToAdd = new Feedback({
        id: uuid.v4(),
        restaurantId: feedbackModel.restaurantId,
        userId: feedbackModel.userId,
        feedbackDate: new Date(),
        text: feedbackModel.text,
        rank: feedbackModel.rank
    });

    return feedbackToAdd.save();
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
