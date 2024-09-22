import express from 'express';
const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Server is alive' });
  });

export default router;