import Restaurant from '../model/restaurant';

const createNewRestaurant = (resName) => {
    let res1 = new Restaurant({
        name: resName
    });

    res1.save((err) => {
        if (err)
            console.log(err);

        console.log('Saved successfuly');
    });
};

const getRestaurantById = (restaurantId, callback) => {
  Restaurant.find({id: restaurantId}, (err, restaurantResult) => {
      if (err) {
          console.log("Err");

          return 'Restaurant not found';
      }

      callback(restaurantResult);
  })
};

module.exports.createNewRestaurant = createNewRestaurant;
module.exports.getRestaurantById = getRestaurantById;