import express from 'express';
import restaurants from './routes/restaurants';

const app = express();

app.get('/', (req, res) => {
    res.send('Working with hot reload 123');
});

app.use('/restaurants', restaurants);

app.listen(3000, () => {
   console.log('Gror API listening on port 3000');
});