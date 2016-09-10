var config = {};

config.server = {};
config.server.port = 3000;

config.mongo = {};
config.mongo.address = "localhost";
config.mongo.databaseName = "gror";
config.mongo.defaultMask = {_id: 0};

export default config;