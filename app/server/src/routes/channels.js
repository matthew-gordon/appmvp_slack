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

    const channel = await db('channels')
      .where({ id: message.channelId })
      .first();

    if (!channel) {
      throw new Error('channel does not exist.');
    }

    const channelMembers = await db('user_channels')
      .select('userId')
      .where({ channelId: message.channelId });

    const [newMessage] = await db('messages')
      .insert({
        channelId: message.channelId,
        authorId: message.userId,
        text: message.content,
      })
      .returning('*');

    const newMessages = channelMembers
      .filter((member) => member.userId !== res.locals.user.id)
      .map((member) => ({
        channelId: channel.id,
        userId: member.userId,
        messageId: newMessage.id,
      }));

    if (newMessages && newMessages.length > 0) {
      try {
        await db('channel_message_stats').insert(newMessages).returning('*');
      } catch (err) {
        console.log(err);
      }
    }

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
