import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/client/:userId/workspaces', async (req, res) => {
  try {
    const workspaces = await db('workspaces')
      .where({ ownerId: req.params.userId })
      .select([
        'workspaces.id',
        'workspaces.name',
        'workspaces.cname',
        db.raw('json_agg(channels.*) as channels'),
      ])
      .leftJoin('channels', 'workspaces.id', 'channels.workspaceId')
      .groupBy('workspaces.id');

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

router.get('/workspaces/:workspaceId/data', async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await db('workspaces').where({ id: workspaceId }).first();

    const channels = await db('channels')
      .where({ workspaceId })
      .select([
        'channels.id',
        'channels.name',
        db.raw('json_agg(messages.*) as messages'),
      ])
      .leftJoin('messages', 'channels.id', 'messages.channelId')
      .groupBy('channels.id');

    // TODO MAKE DEFAULT 1ST MESSAGE
    const formattedChannels = channels.map((channel) => {
      return channel.messages[0] === null
        ? { ...channel, messages: [] }
        : channel;
    });

    const directMessages = await db('users')
      .distinctOn('users.id', 'users.username')
      .leftJoin('direct_messages', (builder) =>
        builder
          .on({ 'users.id': 'direct_messages.senderId' })
          .orOn({ 'users.id': 'direct_messages.recipientId' })
      )
      .where({ workspaceId })
      .select('users.id', 'users.username')
      .orderBy('users.username', 'DESC');

    res.status(200).json({
      status: 'success',
      name: workspace.name,
      channels: formattedChannels,
      directMessages: Array.isArray(directMessages)
        ? directMessages.filter((member) => member.id !== res.locals.user.id)
        : [],
    });
  } catch (err) {
    res.status(500).json({
      status: 'err',
      message: err.message,
    });
  }
});

export default router;
