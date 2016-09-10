import * as q from 'q';
import mongoose from 'mongoose';
import * as loggerUtil from '../utils/loggerUtil';
import config from '../configuration/config';

const connectionUrl = `mongodb://${config.mongo.address}/${config.mongo.databaseName}`;

mongoose.Promise = q.Promise;

// ** Connection events **
// Successfully connected
mongoose.connection.on('connected', () => {
    loggerUtil.logInformation(`Mongoose is connected to ${connectionUrl}`);
});

// Connection Problem
mongoose.connection.on('error', (error) => {
    loggerUtil.logInformation(`Mongoose connection error: ${error}`);
});


export default () => {
    mongoose.connect(connectionUrl);
};

