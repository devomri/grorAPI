import mongoose from 'mongoose';

export const menuSchema = new mongoose.Schema({
    restaurantId: String,
    items: [
        {
            id: String,
            name: String,
            description: String,
            price: Number
        }
    ]
});

export const Menu = mongoose.model('Menu', menuSchema);

export default Menu;