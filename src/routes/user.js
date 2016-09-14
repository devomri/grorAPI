import express from 'express';
import * as userDAL from '../DAL/userDAL';
import { handleError } from '../utils/routeHelper';

const router = express.Router();

// Get users list
router.get('/', handleError((req, res) => {
    return userDAL.getAllUsers()
    .then((users) => res.send(users));
}));

// Create new user
router.post('/', handleError((req, res) => {
    return userDAL.insertNewUser(req.body)
    .then(() => res.send({
        message: 'user was saved successfully'
    }));
}));

// Authenticate user
router.put('/authenticate', handleError((req, res) => {
    return userDAL.authenticateUser(req.body.email, req.body.password)
    .then((isMatch) => res.send({
        authenticationStatus: isMatch
    }));
}));

// Update user email
router.put('/id/:userId', handleError((req, res) => {
    return userDAL.updateUserEmail(req.params.userId, req.body.email)
    .then(() => res.send({
        message: 'User updated successfully'
    }));
}));

// Delete user
router.delete('/id/:userId', handleError((req, res) => {
    return userDAL.deleteUser(req.params.userId)
    .then(() => res.send({
        message: 'User deleted successfully'
    }));
}));

// Get user by id
router.get('/id/:userId', handleError((req, res) => {
    return userDAL.getUserById(req.params.userId)
    .then((user) => res.send(user));
}));

export default router;