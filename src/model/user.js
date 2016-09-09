import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    organizationId: String,
    phoneNumber: String
});

const User = mongoose.model('User', userSchema);

export default User;