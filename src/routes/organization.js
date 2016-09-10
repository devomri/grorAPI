import express from 'express';
import organizationDAL from '../DAL/organizationDAL';

const router = express.Router();

router.get('/', (req, res) => {
    organizationDAL.getAllOrganizations((err, organizations) => {
       if (err){
           res.send({message: err});

           return;
       }

       res.send(organizations);
    });
});


export default router;