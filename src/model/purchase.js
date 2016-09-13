import mongoose from 'mongoose';

export const purchaseSchema = new mongoose.Schema({
    id: String,
    userId: String,
    restaurantId: String,
    time: Date,
    items: [
        {
            itemId: String,
            count: Number
        }
    ]
});

export const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;