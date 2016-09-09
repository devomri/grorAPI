import express from 'express';
import userDAL from '../DAL/userDAL'

const router = express.Router();

// Get users list
router.get('/', (req, res) => {
    userDAL.getAllUsers((err, users) => {
        if (err) {
            res.send({
                message: err
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
                message: `user was not saved: ${err}`
            });

            return;
        }

        res.send({
            message: 'user was saved successfuly'
        })
    })
});

//

export default router;