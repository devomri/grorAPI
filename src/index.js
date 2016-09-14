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
// The last parameter is important to let express know this is an error middleware and not a regular middleware.
app.use((error, req, res, next) => {
  logger.logError(error.stack);

  // All errors should be GrorErrors, but in case this is a different error we still want to have a status code.
  res.status(error.statusCode || 500).send({message: 'An error occurred'});
});


app.listen(config.server.port, () => {
    logger.logInformation(`Gror API listening on port ${config.server.port}`);
});