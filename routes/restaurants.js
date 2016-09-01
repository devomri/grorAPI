/**
 * Created by omri on 9/1/16.
 */

const express = require('express');
const router = express.Router();

// Middleware
router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.send('Restaurant API');
});

// Get restaurant by ID
router.get('/id/:restaurantID', (req, res) => {
    res.send(`Restaurant ID is ${req.params.restaurantID}`);
});

// Search restaurant bt name
router.get('name/:restaurantName', (req, res) => {
    res.send(`Restaurant name is ${req.params.restaurantName}`);
});

module.exports = router;