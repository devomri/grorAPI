import express from 'express';
import * as userDAL from '../DAL/userDAL'

const router = express.Router();

// Get users list
router.get('/', (req, res) => {
    userDAL.getAllUsers((err, users) => {
        if (err) {
            res.send({
                message: "Error while getting all the users"
            });

            return;
        }

        res.send(users);
    })
});

// Create new user
router.post('/', (req, res) => {
    userDAL.insertNewUser(req.body, (err) => {
        if (err) {
            res.send({
                message: 'user was not saved'
            });

            return;
        }

        res.send({
            message: 'user was saved successfully'
        })
    })
});

// Authenticate user
router.put('/authenticate', (req, res) => {
    userDAL.authenticateUser(req.body.email, req.body.password, (err, isMatch) => {
        if (err) {
            return res.send({
                message: `problem authenticating`
            });
        }

        res.send({
            authenticationStatus: isMatch
        });
    });
});

// Update user email
router.put('/id/:userId', (req, res) => {
    userDAL.updateUserEmail(req.params.userId,
        req.body.email,
        (err) => {
            if (err) {
                return res.send({
                    message: 'Problem while updating user email'
                })
            }

            res.send({
                message: 'User updated successfully'
            })
        })
});

// Delete user
router.delete('/id/:userId', (req, res) => {
    userDAL.deleteUser(req.params.userId, (err) => {
        if (err) {
            return res.send({
                message: 'Problem while deleting the user'
            })
        }

        res.send({
            message: 'User deleted successfully'
        })
    })
});

export default router;