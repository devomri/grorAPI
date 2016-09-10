import express from 'express';
import * as restaurantDAL from '../DAL/restaurantDAL';
import * as feedbackDAL from '../DAL/feedbackDAL'

const router = express.Router();

// Get all basic information about all the restaurants
router.get('/', (req, res) => {
    restaurantDAL.getAllRestaurantsPartialData((err, restaurants) => {
       if (err) {
           res.send({
               message: "Error while getting all restaurants"
           });

           return;
       }

        res.send(restaurants);
    });
});

// Serach restaurants by name (case insensitive)
router.get('/name/:restaurantName', (req, res) => {
        restaurantDAL.searchRestaurantByName(req.params.restaurantName,
         (err, restaurants) => {
             if (err) {
                 res.send({
                     message: "Error while searching for restaurant by name"
                 });

                 return;
             }

             res.send(restaurants);
        });
    }
);

// Get restaurant by ID
router.get('/id/:id', (req, res) => {
    restaurantDAL.getRestaurantFullDataById(req.params.id, (err, restaurantResult) =>{
        if (err){
            res.send({
                message: err
            });

            return;
        }

        res.send({
            restaurant: restaurantResult
        });
    });
});

// Create new feedback
router.post('/feedback', (req, res) => {
    feedbackDAL.insertRestaurantFeedback(req.body, (err) => {
        if (err) {
            return res.send({
                message: `Error while creating the feedback`
            });
        }

        res.send({
            message: 'Feedback created successfully'
        });
    })
});

// Remove a feedback
router.delete('/feedback/id/:id', (req, res) => {
    feedbackDAL.removeRestaurantFeedback(req.params.id, (err) => {
       if (err) {
           return res.send({
               message: 'Feedback was not removed'
           });
       }

        res.send({
            message: 'Feedback removed successfully'
        })
    });
});

// Update a feedback
router.put('/feedback', (req, res) => {
    feedbackDAL.updateRestaurantFeedback(req.body.id,
        req.body.text,
        req.body.rank,
        (err) => {
            if (err) {
                return res.send({
                    message: 'Feedback was not updated'
                });
            }

            res.send({
                message: 'Feedback updated successfully'
            })
        })
});

export default router;