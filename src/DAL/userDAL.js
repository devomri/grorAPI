import uuid from 'uuid';
import User from '../model/user';
import loggerUtil from '../utils/loggerUtil';

function getAllUsers(callback) {
    // Mask the password
    User.find({}, {password: 0} , (err, users) => {
        if (err) {
            loggerUtil.logError(`Error in getAllUsers method: ${err}`);

            callback(err);
        }

        callback(null, users)
    });
}

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

module.exports.getAllUsers = getAllUsers;
module.exports.insertNewUser = insertNewUser;