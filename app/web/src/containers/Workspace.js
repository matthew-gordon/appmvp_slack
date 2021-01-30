import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { getWorkspaceData } from '../actions/workspace';
import Channels from '../components/Workspace/Channels';
import Messages from './Messages';

const NEW_WORKSPACE_MESSAGE = 'NEW_WORKSPACE_MESSAGE';
const SOCKET_SERVER = 'http://localhost:3000';

const Workspace = () => {
  const socketRef = useRef();
  const { workspaceId, channelId } = useParams();
  const auth = useSelector((state) => state.auth);
  const workspace = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadWorkspace = () => {
      dispatch(getWorkspaceData({ workspaceId }));

      socketRef.current = socketIOClient(SOCKET_SERVER, {
        query: { workspaceId },
      });

      socketRef.current.on(NEW_WORKSPACE_MESSAGE, (message) => {
        // setMessages([...messages, { content: message.content }]);
      });
    };

    loadWorkspace();
  }, []);

  const sendMessage = (content) => {
    socketRef.current.emit(NEW_WORKSPACE_MESSAGE, {
      senderId: socketRef.current.id,
      // userId,
      content,
    });
  };

  if (workspace && !workspace.channels.length) {
    return null;
  }

  const channelIdx = channelId
    ? workspace.channels.findIndex(
        (channel) => channel.id === parseInt(channelId)
      )
    : 0;

  return (
    <Container>
      <Channels user={auth.userInfo} />
      <Header>Header</Header>
      <Messages />
      <InputContainer>
        <Input
          type="text"
          placeholder="message #team"
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key.toLowerCase() === 'enter') {
          //     sendMessage(message);
          //     setMessage('');
          //   }
          // }}
        />
      </InputContainer>
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

const Header = styled.div`
  background-color: #ffffff;
  grid-column: 2;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  padding: 1em;
  text-align: center;
`;

const InputContainer = styled.div`
  background-color: #fff;
  grid-column: 2;
  grid-row: 3;
  color: #fff;
  padding: 1em;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1em;
  outline: none;
  border: 1px solid #f2f2f2;
`;
