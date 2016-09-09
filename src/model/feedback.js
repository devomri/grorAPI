import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    id: String,
    restaurantId: String,
    userId: String,
    feedbackDate: Date,
    text: String,
    rank: Number
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
