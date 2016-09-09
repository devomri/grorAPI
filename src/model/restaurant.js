import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    id: String,
    menuId: String,
    name: String,
    phoneNumber: String,
    location: String,
    minimumOrderPrice: Number,
    minimumSalePrice: Number
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;