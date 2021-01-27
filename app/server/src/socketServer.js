import socket from 'socket.io';

const NEW_WORKSPACE_MESSAGE = 'NEW_WORKSPACE_MESSAGE';

async function createSocketServer({ server }) {
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    const { workspaceId } = socket.handshake.query;
    socket.join(workspaceId);

    socket.on(NEW_WORKSPACE_MESSAGE, (data) => {
      io.in(workspaceId).emit(NEW_WORKSPACE_MESSAGE, data);
    });

    socket.on('disconnect', () => {
      socket.leave(workspaceId);
    });
  });
}

export { createSocketServer };
