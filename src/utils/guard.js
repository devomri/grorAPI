import GrorError from './grorError';

export const guardInstance = (message, statusCode) => {
  return guardAll([message], [statusCode]);
};

export const guardAll = (messages, statusCodes) => {
  return () => {
    const args = arguments;
    messages.forEach((message, index) => {
      if(!args[index])
        throw new GrorError(message, statusCodes[index]);
    });

    return arguments;
  };
};
