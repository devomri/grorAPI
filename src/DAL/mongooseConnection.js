import mongoose from 'mongoose';
import loggerUtil from '../utils/loggerUtil';
import config from '../configuration/config';

const connectionUrl = `mongodb://${config.mongo.address}/${config.mongo.databaseName}`;

// ** Connection events **
// Successfully connected
mongoose.connection.on('connected', () => {
    loggerUtil.logInformation(`Mongoose is connected to ${connectionUrl}`);
});

// Connection Problem
mongoose.connection.on('error', (error) => {
    loggerUtil.logInformation(`Mongoose connection error: ${error}`);
});


const mongoConnect = () => {
    mongoose.connect(connectionUrl);
};

export default mongoConnect;
