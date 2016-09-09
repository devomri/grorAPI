import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
    id: String,
    name: String,
    location: String,
    users: [
        {id: String}
    ]
});

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;