import express from 'express';
import userDAL from '../DAL/userDAL'

const router = express.Router();

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

router.post('/', (req, res) => {
    res.send({
        message: `Put new user ${JSON.stringify(req.body)}`
    });
});

export default router;