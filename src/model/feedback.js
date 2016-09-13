import mongoose from 'mongoose';

export const feedbackSchema = new mongoose.Schema({
    id: String,
    restaurantId: String,
    userId: String,
    feedbackDate: Date,
    text: String,
    rank: Number
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
