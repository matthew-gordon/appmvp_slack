import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { getWorkspaceData } from '../actions/workspace';
import { getWorkspaces } from '../actions/app';
import { newChannelMessage } from '../actions/channel';
import Channels from '../containers/Channels';
import Workspaces from '../containers/Workspaces';
import Channel from '../containers/Channel';

const NEW_WORKSPACE_MESSAGE = 'NEW_WORKSPACE_MESSAGE';
const SOCKET_SERVER = 'http://localhost:3000';

const Workspace = () => {
  const { workspaceId, channelId } = useParams();
  const socketRef = useRef();
  const auth = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);
  const workspace = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaceData({ workspaceId }));
  }, [dispatch, workspaceId, channelId]);

  useEffect(() => {
    dispatch(getWorkspaces({ userId: auth.userInfo.id }));

    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { workspaceId },
    });

    socketRef.current.on(NEW_WORKSPACE_MESSAGE, (message) => {
      dispatch(newChannelMessage({ message }));
    });
  }, [dispatch, auth.userInfo.id, workspaceId, channelId]);

  if (workspace && !workspace.channels.length) {
    return null;
  }

  return (
    <Container>
      <Workspaces workspaces={app.workspaces} />
      <Channels channels={workspace.channels} user={auth.userInfo} />
      <Channel socket={socketRef} />
    </Container>
  );
};

export default Workspace;

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;
