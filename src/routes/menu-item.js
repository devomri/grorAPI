import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send([
    {
      item: 1
    },
    {
      item: 2
    }
  ]);
});

export default router;
