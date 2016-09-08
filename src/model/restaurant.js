import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;