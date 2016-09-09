import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
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

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;