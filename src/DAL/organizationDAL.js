import Organization from '../model/organization';
import config from '../configuration/config';

export const getAllOrganizations = () => {
    return Organization.find({}, config.mongo.defaultMask);
};

export const getOrganizationById = (organizationId) => {
  return Organization.findOne({ id: organizationId },
      config.mongo.defaultMask);
};
