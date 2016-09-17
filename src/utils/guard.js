import GrorError from './grorError';

export const guardInstance = (message, statusCode) => {
  return (instance) => {
    if(!instance)
      throw new GrorError(message, statusCode);

    return instance;
  };
};

export const guardAll = (messages, statusCodes) => {
  return (...args) => {
    messages.forEach((message, index) => {
      if(!args[index])
        throw new GrorError(message, statusCodes[index]);
    });

    return args;
  };
};
