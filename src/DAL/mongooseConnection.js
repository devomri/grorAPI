import mongoose from 'mongoose';

const mongoDBUrl = "localhost";
const databaseName = "gror";
const connectionUrl = `mongodb://${mongoDBUrl}/${databaseName}`;

// ** Connection events **
// Successfully connected
mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${connectionUrl}`);
});

// Connection Problem
mongoose.connection.on('error', (error) => {
    console.log(`Mongoose connection error: ${error}`);
});


const mongoConnect = () => {
    mongoose.connect(connectionUrl);
};

export default mongoConnect;
