import uuid from 'uuid';
import User from '../model/user';
import config from '../configuration/config';
import { getOrganizationById } from './organizationDAL';
import { guardInstance } from '../utils/guard';

export const getAllUsers = () => {
    return User.find({}, config.mongo.defaultMask);
};

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
    return getOrganizationById(userModel.organizationId)
    .then(guardInstance(`Organization with id: ${userModel.organizationId} not found`))
    .then(() => userToAdd.save());
};

export const authenticateUser = (email, userPass) => {
    return User.findOne({ email },config.mongo.defaultMask)
    .then(guardInstance(`User with email: ${email} not found`, 404))
    .then((userData) => userData.comparePassword(userPass));
};

export const updateUserEmail = (id, email) => {
    return User.update({ id }, { $set: { email } });
};

export const deleteUser = (id) => {
    return User.remove({ id });
};

export const getUserById = (id) => {
  return User.findOne({ id }, config.mongo.defaultMask)
  .then(guardInstance(`User with email: ${id} not found`, 404));
};
