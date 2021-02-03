import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/channels/:channelId/data', async (req, res) => {
  try {
    const channel = await db('channels')
      .where({ id: req.params.channelId })
      .first();

    const members = await db('user_channels')
      .where({ channelId: req.params.channelId })
      .leftJoin('users', 'user_channels.userId', 'users.id')
      .select('users.id', 'users.username', 'users.email');

    const messages = await db('messages')
      .where({ channelId: channel.id })
      .leftJoin('users', 'messages.authorId', 'users.id')
      .select(
        'users.id as userId',
        'users.username',
        'messages.id as messageId',
        'messages.text',
        'messages.created_at',
        'messages.updated_at'
      )
      .orderBy('created_at', 'ASC');

    res.status(200).json({
      status: 'success',
      ...channel,
      members,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      status: 'err',
      message: err.message,
    });
  }
});

router.post('/channels/:channelId/messages/new', async (req, res) => {
  try {
    const { message } = req.body;

    const [newMessage] = await db('messages')
      .insert({
        channelId: message.channelId,
        authorId: message.userId,
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
