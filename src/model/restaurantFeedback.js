import mongoose from 'mongoose';

const restaurantFeedbackSchema = new mongoose.Schema({
    id: String,
    restaurantID: String,
    userID: String,
    feedbackDate: Date,
    text: String,
    rank: Number
});

const RestaurantFeedback = mongoose.model('RestaurantFeedback', restaurantFeedbackSchema);

export default RestaurantFeedback;
