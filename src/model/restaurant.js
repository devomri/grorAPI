import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    id: string,
    name: String,
    phoneNumber: String,
    location: String,
    minimumOrderPrice: Number,
    minimumSalePrice: Number
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;