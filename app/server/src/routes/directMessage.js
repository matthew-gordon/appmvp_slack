import express from 'express';
import db from '../db';

const router = express.Router();

router.get(
  '/workspaces/:workspaceId/direct-messages/:recipientId',
  async (req, res) => {
    try {
      const { workspaceId, recipientId } = req.params;

      const user = await db('users')
        .where({ id: recipientId })
        .first(['id', 'username']);

      const messages = await db('direct_messages')
        .where({ workspaceId })
        .andWhere((builder) =>
          builder
            .where({
              senderId: res.locals.user.id,
              recipientId,
            })
            .orWhere({
              senderId: recipientId,
              recipientId: res.locals.user.id,
            })
        )
        .leftJoin('users', 'direct_messages.senderId', 'users.id')
        .select([
          'users.username',
          'direct_messages.id',
          'direct_messages.text',
          'direct_messages.created_at',
        ])
        .orderBy('created_at', 'ASC');

      res.status(200).json({
        status: 'success',
        messages,
        user,
      });
    } catch (err) {
      res.status(500).json({
        status: 'err',
        message: err.message,
      });
    }
  }
);

router.post('/direct-messages/:recipientlId/new', async (req, res) => {
  try {
    const { message } = req.body;

    console.log(message);

    const [newMessage] = await db('direct_messages')
      .insert({
        workspaceId: message.workspaceId,
        senderId: res.locals.user.id,
        recipientId: message.recipientId,
        text: message.content,
      })
      .returning('*');

    res.status(200).json({
      status: 'success',
      message: newMessage,
    });
  } catch (err) {
    res.status(500).json({
      status: 'err',
      message: err.message,
    });
  }
});

export default router;
