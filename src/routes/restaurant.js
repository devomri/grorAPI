import express from 'express';
import * as restaurantDAL from '../DAL/restaurantDAL';
import * as feedbackDAL from '../DAL/feedbackDAL';
import { handleError } from '../utils/routeHelper';

const router = express.Router();

// Get all basic information about all the restaurants
router.get('/', handleError((req, res) => {
    return restaurantDAL.getAllRestaurantsPartialData()
    .then((restaurants) => res.send(restaurants));
}));

// Serach restaurants by name (case insensitive)
router.get('/name/:restaurantName', handleError((req, res) => {
    return restaurantDAL.searchRestaurantByName(req.params.restaurantName)
    .then((restaurants) => res.send(restaurants));
}));

// Get restaurant by ID
router.get('/id/:id', handleError((req, res) => {
    return restaurantDAL.getRestaurantFullDataById(req.params.id)
    .then((restaurant) => res.send(restaurant));
}));

// Create new feedback
router.post('/feedback', handleError((req, res) => {
    feedbackDAL.insertRestaurantFeedback(req.body)
    .then(() => res.send({
      message: 'Feedback created successfully'
    }));
}));

// Remove a feedback
router.delete('/feedback/id/:id', handleError((req, res) => {
  return feedbackDAL.removeRestaurantFeedback(req.params.id)
  .then(() => res.send({
    message: 'Feedback removed successfully'
  }));
}));

// Update a feedback
router.put('/feedback', handleError((req, res) => {
    const feedbackLikeObject = {
      id: req.body.id,
      text: req.body.text,
      rank: req.body.rank
    };

    return feedbackDAL.updateRestaurantFeedback(feedbackLikeObject)
    .then(() => res.send({
        message : 'Feedback updated successfully'
      }));
}));

export default router;