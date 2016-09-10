import express from 'express';
import * as organizationDAL from '../DAL/organizationDAL';

const router = express.Router();

router.get('/', (req, res) => {
    organizationDAL.getAllOrganizations((err, organizations) => {
       if (err){
           return res.send({message: "Error while getting the organizations"});
       }

       res.send(organizations);
    });
});


export default router;