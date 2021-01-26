import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/client/:id/workspaces', async (req, res) => {
  try {
    const workspaces = await db('workspaces')
      .where({ ownerId: req.params.id })
      .select();

    res.status(200).json({
      status: 'success',
      workspaces,
    });
  } catch (err) {
    res.status(500).json({
      status: 'err',
      message: err.message,
    });
  }
});

export default router;
