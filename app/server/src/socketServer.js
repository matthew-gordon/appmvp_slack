import socket from 'socket.io';

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';
const NEW_DIRECT_MESSAGE = 'NEW_DIRECT_MESSAGE';
const UPDATE_UNREAD_MESSAGE_COUNT = 'UPDATE_UNREAD_MESSAGE_COUNT';

async function createSocketServer({ server }) {
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const { workspaceId } = socket.handshake.query;

    socket.join(workspaceId);

    socket.on(NEW_CHANNEL_MESSAGE, (data) => {
      io.in(workspaceId).emit(NEW_CHANNEL_MESSAGE, data);
      io.in(workspaceId).emit(UPDATE_UNREAD_MESSAGE_COUNT, data);
    });

    socket.on(NEW_DIRECT_MESSAGE, (data) => {
      io.in(workspaceId).emit(NEW_DIRECT_MESSAGE, data);
    });

    socket.on('disconnect', () => {
      socket.leave(workspaceId);
    });
  });
}

export { createSocketServer };
