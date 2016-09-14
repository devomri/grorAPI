import Organization from '../model/organization';
import config from '../configuration/config';
import { guardInstance } from '../utils/guard';

export const getAllOrganizations = () => {
    return Organization.find({}, config.mongo.defaultMask);
};

export const getOrganizationById = (id) => {
  return Organization.findOne({ id }, config.mongo.defaultMask)
  .then(guardInstance(`Organization with id: ${id} not found`, 404));
};
