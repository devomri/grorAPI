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

// Search restaurant by name
router.get('/name/:name', (req, res) => {
  res.send([{
    restaurant: req.params.name
  }]);
});

export default router;