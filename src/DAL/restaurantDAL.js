import mongoose from 'mongoose';
import Restaurant from '../model/restaurant';

mongoose.connect('mongodb://localhost/gror');

function createNewRestaurant(resName) {
    let res1 = new Restaurant({
        name: resName
    });

    res1.save((err) => {
        if (err)
            console.log(err);

        console.log('Saved successfuly');
    });
}

module.exports.createNewRestaurant = createNewRestaurant;