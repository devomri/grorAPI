import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
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

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;