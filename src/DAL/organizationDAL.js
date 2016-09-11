import Organization from '../model/organization';
import config from '../configuration/config';

export const getAllOrganizations = () => {
    return Organization.find({}, config.mongo.defaultMask);
};
