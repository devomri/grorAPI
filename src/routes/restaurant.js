import express from 'express';
import restaurantDAL from '../DAL/restaurantDAL';

const router = express.Router();

router.get('/', (req, res) => {
  res.send([
    {
      restaurant: 1
    },
    {
      restaurant: 2
    }
  ]);
});

// Get restaurant by ID
router.get('/id/:id', (req, res) => {
    res.send({
        restaurant: req.params.id
    });
});

// Search restaurant bt name
router.get('/name/:name', (req, res) => {
  res.send([{
    restaurant: req.params.name
  }]);
});

export default router;