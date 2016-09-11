import uuid from 'uuid';
import User from '../model/user';
import config from '../configuration/config';
import { getOrganizationById } from './organizationDAL';

export const getAllUsers = () => {
    return User.find({}, config.mongo.defaultMask);
};

// Create new user
export const insertNewUser = (userModel) => {
    const userToAdd = new User({
        id: uuid.v4(),
        email: userModel.email,
        password: userModel.password,
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        organizationId: userModel.organizationId,
        phoneNumber: userModel.phoneNumber
    });

    // Verify that the organization exists before saving the user
    const verifyOrganizationPromise = getOrganizationById(userModel.organizationId);

    return verifyOrganizationPromise.then((organization) => {
        if(organization) {
            return userToAdd.save();
        }
        else {
            throw new Error("No such organization");
        }
    });
};

// Authenticate user
export const authenticateUser = (userEmail, userPass) => {
    return User.findOne({email: userEmail},config.mongo.defaultMask)
      .then((userData) => userData.comparePassword(userPass));
};

// Update user email
export const updateUserEmail = (userId, userNewEmail) => {
    return User.update({ id: userId }, {
        $set: {
            email: userNewEmail
        }
    });
};

// Delete user
export const deleteUser = (userId) => {
    return User.remove({id: userId});
};

// Get user details by id
export const getUserById = (userId) => {
  return User.findOne({id: userId}, config.mongo.defaultMask);
};
