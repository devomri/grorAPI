// Basic logger
// Can be extended in a future version of the app (saving all the logs to Kibana etc..)
import dateUtil from './dateUtil';

const logTypes = {
    INFORMATION: 0,
    ERROR: 1,
    DEBUG: 2
};

function logMessage(type, message) {
    var datePrefix = `${dateUtil.getDateTimeString()}`;

    switch (type){
        case logTypes.INFORMATION: {
            console.log(`${datePrefix} - Info log: ${message}`);

            break;
        }
        case logTypes.ERROR: {
            console.log(`${datePrefix} - Error log: ${message}`);

            break;
        }
        case logTypes.DEBUG: {
            console.log(`${datePrefix} - Debugging log: ${message}`);

            break;
        }
        default: {
            console.log(`${datePrefix} - Log: ${message}`);
        }
    }
}

function logError(message) {
    logMessage(logTypes.ERROR, message);
}

function logInformation(message) {
    logMessage(logTypes.INFORMATION, message);
}

function logDebug(message) {
    logMessage(logTypes.DEBUG, message);
}

module.exports.logError = logError;
module.exports.logInformation = logInformation;
module.exports.logDebug = logDebug;