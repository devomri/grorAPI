// Basic logger
// Can be extended in a future version of the app (saving all the logs to Kibana etc..)
const logTypes = {
    INFORMATION: 'Info',
    ERROR: 'Error',
    DEBUG: 'Debug'
};

export const logMessage = (type, message) => {
    type = type || '';

    console.log(`${new Date().toISOString()} - ${type} log: ${message}`);
};

export const logError = (message) => {
    logMessage(logTypes.ERROR, message);
};

export const logInformation = (message) => {
    logMessage(logTypes.INFORMATION, message);
};

export const logDebug = (message) => {
    logMessage(logTypes.DEBUG, message);
};
