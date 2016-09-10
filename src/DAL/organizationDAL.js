import * as loggerUtil from '../utils/loggerUtil';
import Organization from '../model/organization';
import config from '../configuration/config';

export const getAllOrganizations = (callback) => {
    Organization.find({}, config.mongo.defaultMask,
        (err, organizations) => {
        if (err) {
            loggerUtil.logError(`getAllRestaurants got an error: ${err}`);

            return callback(err);
        }

        callback(err, organizations);
    });
};
