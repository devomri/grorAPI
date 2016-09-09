import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    id: String,
    name: String,
    phoneNumber: String,
    location: String,
    minimumOrderPrice: Number,
    minimumSalePrice: Number,
    manager: {
        firstName: String,
        lastName: String,
        phoneNumber: String
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;