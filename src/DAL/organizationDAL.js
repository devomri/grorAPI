import Organization from '../model/organization';
import config from '../configuration/config';
import GrorError from '../utils/grorError';

export const getAllOrganizations = () => {
    return Organization.find({}, config.mongo.defaultMask);
};

export const getOrganizationById = (id) => {
  return Organization.findOne({ id }, config.mongo.defaultMask)
  .then(() => {
    throw new GrorError(`Organization with id: ${id} not found`, 404);
  });
};
