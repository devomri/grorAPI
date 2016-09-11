import express from 'express';
import * as userDAL from '../DAL/userDAL';
import fix from '../utils/fixer';

const router = express.Router();

// Get users list
router.get('/', (req, res, next) => {
    userDAL.getAllUsers()
    .then((users) => res.send(users))
    .catch(fix(next, new Error('Error while getting all the users')));
});

// Create new user
router.post('/', (req, res, next) => {
    userDAL.insertNewUser(req.body)
    .then(() => res.send({
        message: 'user was saved successfully'
    }))
    .catch(next);
});

// Authenticate user
router.put('/authenticate', (req, res, next) => {
    userDAL.authenticateUser(req.body.email, req.body.password)
    .then((isMatch) => res.send({
        authenticationStatus: isMatch
    }))
    .catch(fix(next, new Error('problem authenticating')));
});

// Update user email
router.put('/id/:userId', (req, res, next) => {
    userDAL.updateUserEmail(req.params.userId, req.body.email)
    .then(() => res.send({
        message: 'User updated successfully'
    }))
    .catch(fix(next, new Error('Problem while updating user email')));
});

// Delete user
router.delete('/id/:userId', (req, res, next) => {
    userDAL.deleteUser(req.params.userId)
    .then(() => res.send({
        message: 'User deleted successfully'
    }))
    .catch(fix(next, new Error('Problem while deleting the user')));
});

// Get user by id
router.get('/id/:userId', (req, res, next) => {
    userDAL.getUserById(req.params.userId)
        .then((user) => res.send(user))
        .catch(fix(next, new Error('Error while getting user by id')));
});

export default router;