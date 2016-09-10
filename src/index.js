import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoConnect from './DAL/mongooseConnection';
import * as loggerUtil from './utils/loggerUtil';
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

app.listen(config.server.port, () => {
    loggerUtil.logInformation(`Gror API listening on port ${config.server.port}`);
});