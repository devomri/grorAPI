import * as q from 'q';
import mongoose from 'mongoose';
import * as loggerUtil from '../utils/loggerUtil';
import config from '../configuration/config';
import { generateGrorSchema } from './schemaCreation';

const connectionUrl = `mongodb://${config.mongo.address}/${config.mongo.databaseName}`;

mongoose.Promise = q.Promise;

// ** Connection events **
// Successfully connected
mongoose.connection.on('connected', () => {
    loggerUtil.logInformation(`Mongoose is connected to ${connectionUrl}`);

    // Check if there is a need to dynamically create the database schema
    createMongooseSchemaDynamically();
});

// Connection Problem
mongoose.connection.on('error', (error) => {
    loggerUtil.logInformation(`Mongoose connection error: ${error}`);
});

// Dynamically create the database schema
const createMongooseSchemaDynamically = () => {
    mongoose.connection.db.listCollections({name: 'restaurants'})
        .next((err, restaurtantCollectionInfo) => {
            // If there is no restaurant collection, we will recreate the databsae
            if (!restaurtantCollectionInfo) {
                loggerUtil.logInformation("Gror schema was not available. Generating schema...");

                generateGrorSchema()
                    .then(() => loggerUtil.logInformation("Schema was generated successfully"))
                    .catch((err) => loggerUtil.logError(`Schema was could not be generated: ${err}`));
            }
        });
};


export default () => {
    mongoose.connect(connectionUrl);
};

