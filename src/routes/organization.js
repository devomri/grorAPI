import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send([
    {
      organization: 1
    },
    {
      organization: 2
    }
  ]);
});

export default router;
