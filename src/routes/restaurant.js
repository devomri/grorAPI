import express from 'express';
import restaurantDAL from '../DAL/restaurantDAL';

const router = express.Router();

// Get all basic information about all the restaurants
router.get('/', (req, res) => {

    restaurantDAL.getAllRestaurantsPartialData((err, restaurants) => {
       if (err) {
           res.send({
               message: err
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
                     message: err
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

// Search restaurant by name
router.get('/name/:name', (req, res) => {
  res.send([{
    restaurant: req.params.name
  }]);
});

export default router;