import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/users/:userId/workspaces', async (req, res) => {
  try {
    const ownedWorkspaces = await db('workspaces')
      .where({ ownerId: req.params.userId })
      .select([
        'workspaces.id',
        'workspaces.name',
        'workspaces.cname',
        db.raw('json_agg(channels.*) as channels'),
      ])
      .leftJoin('channels', 'workspaces.id', 'channels.workspaceId')
      .groupBy('workspaces.id');

    const joinedWorkspaces = await db('user_workspaces')
      .where({ userId: req.params.userId })
      .andWhereNot({ ownerId: req.params.userId })
      .select([
        'workspaces.id',
        'workspaces.name',
        'workspaces.cname',
        db.raw('json_agg(channels.*) as channels'),
      ])
      .leftJoin('workspaces', 'user_workspaces.workspaceId', 'workspaces.id')
      .leftJoin('channels', 'workspaces.id', 'channels.workspaceId')
      .groupBy('workspaces.id');

    const workspaces = [...ownedWorkspaces, ...joinedWorkspaces];

    res.status(200).json({
      status: 'success',
      workspaces: [
        ...workspaces.map((workspace) => {
          return {
            ...workspace,
            defaultChannel: workspace.channels
              .filter((channel) => channel.default === true)
              .pop(),
          };
        }),
      ],
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

    const owner = await db('users')
      .where({ id: workspace.ownerId })
      .first(['id', 'username', 'email']);

    const channels = await db('channels')
      .where({ workspaceId })
      .select(['channels.*', db.raw('json_agg(messages.*) as messages')])
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
      id: workspace.id,
      name: workspace.name,
      defaultChannel: channels
        .filter((channel) => channel.default === true)
        .pop(),
      channels: formattedChannels,
      directMessages: Array.isArray(directMessages)
        ? directMessages.filter((member) => member.id !== res.locals.user.id)
        : [],
      owner,
    });
  } catch (err) {
    res.status(500).json({
      status: 'err',
      message: err.message,
    });
  }
});

router.get('/workspaces/:workspaceId/unread-messages', async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await db('workspaces').first().where({ id: workspaceId });

    if (!workspace) {
      throw new Error('workspace does not exist.');
    }

    const channels = await db('channels')
      .select()
      .where({ workspaceId: workspace.id });

    const [messageStats] = await db('channel_message_stats')
      .select()
      .whereIn(
        'channelId',
        channels.map((channel) => channel.id)
      )
      .andWhere({
        userId: res.locals.user.id,
        read: false,
      })
      .count();

    const totalCount = parseInt(messageStats.count, 10);

    res.status(200).json({
      count: totalCount,
    });
  } catch (err) {
    res.status(500).json({
      status: 'err',
      message: err.message,
    });
  }
});

export default router;
