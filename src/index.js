import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoConnect from './DAL/mongooseConnection';
import * as logger from './utils/loggerUtil';
import config from './configuration/config';

mongoConnect();

const app = express();

// Middleware
express.Router().use((req, res, next) => {
  //Authentication middleware
  next();
});

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Working');
});

Object.keys(routes).forEach((routeName) => {
  app.use(`/${routeName}`, routes[routeName]);
});

// This middleware is being used after the actual routes to be handled after them.
app.use((error, req, res, next) => {
  logger.logError(error.toString());
  logger.logError(error.stack);
  res.status(500).send({message: 'An error occurred'});
});


app.listen(config.server.port, () => {
    logger.logInformation(`Gror API listening on port ${config.server.port}`);
});