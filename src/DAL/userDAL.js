import uuid from 'uuid';
import User from '../model/user';
import loggerUtil from '../utils/loggerUtil';
import config from '../configuration/config';

function getAllUsers(callback) {
    User.find({}, config.mongo.defaultMask,
        (err, users) => {
        if (err) {
            loggerUtil.logError(`Error in getAllUsers method: ${err}`);

            return callback(err);
        }

        callback(null, users)
    });
}

// Create new user
function insertNewUser(userModel, callback) {
    const userToAdd = new User({
        id: uuid.v4(),
        email: userModel.email,
        password: userModel.password,
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        organizationId: userModel.organizationId,
        phoneNumber: userModel.phoneNumber
    });

    userToAdd.save((err) => {
        if (err){
            loggerUtil.logError(`Error in insertNewUser: ${err}`);
        }

        callback(err);
    });
}

// Authenticate user
function authenticateUser(userEmail, userPass, callback) {
    User.findOne({email: userEmail},config.mongo.defaultMask,
        (err, userData) => {
            if (err){
                loggerUtil.logError(`Error in authenticateUser: ${err}`);
                return callback(err);
            }

            if (!userData) {
                return callback(null, false);
            }

            userData.comparePassword(userPass, (err, isMatch) => {
                if (err){
                    loggerUtil.logError(`Error in authenticateUser: ${err}`);
                }

                return callback(err, isMatch);
            })
    });
}

module.exports.getAllUsers = getAllUsers;
module.exports.insertNewUser = insertNewUser;
module.exports.authenticateUser = authenticateUser;