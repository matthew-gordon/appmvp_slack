import socket from 'socket.io';

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

async function createSocketServer({ server }) {
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const { workspaceId, channelId } = socket.handshake.query;

    socket.join(channelId);

    socket.on(NEW_CHANNEL_MESSAGE, (data) => {
      io.in(channelId).emit(NEW_CHANNEL_MESSAGE, data);
    });

    socket.on('disconnect', () => {
      socket.leave(channelId);
    });
  });
}

export { createSocketServer };
