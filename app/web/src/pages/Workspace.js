import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { getWorkspaceData } from '../actions/workspace';
import { newChannelMessage } from '../actions/channel';
import Channels from '../components/Workspace/Channels';
import Channel from '../containers/Channel';

const NEW_WORKSPACE_MESSAGE = 'NEW_WORKSPACE_MESSAGE';
const SOCKET_SERVER = 'http://localhost:3000';

const Workspace = () => {
  const socketRef = useRef();
  const { workspaceId, channelId } = useParams();
  const auth = useSelector((state) => state.auth);
  const workspace = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaceData({ workspaceId }));

    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { workspaceId },
    });

    socketRef.current.on(NEW_WORKSPACE_MESSAGE, (message) => {
      dispatch(newChannelMessage({ message }));
    });
  }, [dispatch, workspaceId]);

  if (workspace && !workspace.channels.length) {
    return null;
  }

  return (
    <Container>
      <Channels user={auth.userInfo} />
      <Channel socket={socketRef} />
    </Container>
  );
};

export default Workspace;

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

// const Channels = styled.div`
//   background-color: #52364e;
//   grid-column: 2;
//   grid-row: 1 / 4;
//   color: #fff;
//   padding: 1em;
//   text-align: center;
// `;
