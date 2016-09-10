import express from 'express';
import * as organizationDAL from '../DAL/organizationDAL';
import fix from '../utils/fixer';

const router = express.Router();

router.get('/', (req, res, next) => {
    organizationDAL.getAllOrganizations()
    .then((organizations) => res.send(organizations))
    .catch(fix(next, new Error('Error while getting the organizations')));
});


export default router;