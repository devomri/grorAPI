/**
 * Created by omri on 9/1/16.
 */

const express = require('express');
const app = express();

const restaurants = require('./routes/restaurants');

app.get('/', (req, res) => {
    res.send('Working');
});

app.use('/restaurants', restaurants);

app.listen(3000, () => {
   console.log('Gror API listening on port 3000');
});