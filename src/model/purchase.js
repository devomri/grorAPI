import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
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

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;