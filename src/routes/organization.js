import express from 'express';
import * as organizationDAL from '../DAL/organizationDAL';
import { handleError } from '../utils/routeHelper';

const router = express.Router();

router.get('/', handleError((req, res) => {
    return organizationDAL.getAllOrganizations()
    .then((organizations) => res.send(organizations));
}));

router.get('/id/:organizationId', handleError((req, res) => {
    return organizationDAL.getOrganizationById(req.params.organizationId)
    .then((organization => res.send(organization)));
}));

export default router;