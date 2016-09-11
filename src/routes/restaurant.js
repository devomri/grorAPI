import express from 'express';
import * as restaurantDAL from '../DAL/restaurantDAL';
import * as feedbackDAL from '../DAL/feedbackDAL';
import fix from '../utils/fixer';

const router = express.Router();

// Get all basic information about all the restaurants
router.get('/', (req, res, next) => {
    restaurantDAL.getAllRestaurantsPartialData()
    .then((restaurants) => res.send(restaurants))
    .catch(fix(next, new Error('Error while getting all restaurants')));
});

// Serach restaurants by name (case insensitive)
router.get('/name/:restaurantName', (req, res, next) => {
    restaurantDAL.searchRestaurantByName(req.params.restaurantName)
    .then((restaurants) => res.send(restaurants))
    .catch(fix(next, new Error('Error while searching for restaurant by name')));
});

// Get restaurant by ID
router.get('/id/:id', (req, res, next) => {
    restaurantDAL.getRestaurantFullDataById(req.params.id)
    .then((restaurant) => res.send(restaurant))
    .catch(fix(next, new Error('Error while getting restaurant')));
});

// Create new feedback
router.post('/feedback', (req, res, next) => {
    feedbackDAL.insertRestaurantFeedback(req.body)
    .then(() => res.send({
      message: 'Feedback created successfully'
    }))
    .catch(next);
});

// Remove a feedback
router.delete('/feedback/id/:id', (req, res, next) => {
  feedbackDAL.removeRestaurantFeedback(req.params.id)
  .then(() => res.send({
    message: 'Feedback removed successfully'
  }))
  .catch(fix(next, new Error('Feedback was not removed')));
});

// Update a feedback
router.put('/feedback', (req, res, next) => {
    const feedbackLikeObject = {
      id: req.body.id,
      text: req.body.text,
      rank: req.body.rank
    };

    feedbackDAL.updateRestaurantFeedback(feedbackLikeObject)
    .then(() => res.send({
        message : 'Feedback updated successfully'
      }))
    .catch(next);
});

export default router;