import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/channels/:channelId/messages', async (req, res) => {
  try {
    const messages = await db('messages')
      .where({ channelId: req.params.channelId })
      .select();

    res.status(200).json({
      status: 'success',
      messages,
    });
  } catch (err) {
    res.status(500).json({
      status: 'err',
      message: err.message,
    });
  }
});

export default router;
