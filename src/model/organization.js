import mongoose from 'mongoose';

export const organizationSchema = new mongoose.Schema({
    id: String,
    name: String,
    location: String,
    description: String,
    contacts: [
        {
            firstName: String,
            lastName: String,
            jobTitle: String,
            phoneNumber: String
        }
    ]
});

export const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;