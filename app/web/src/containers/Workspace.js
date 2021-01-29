import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { getWorkspaceData } from '../actions/workspace';
import Channels from '../components/Workspace/Channels';

const NEW_WORKSPACE_MESSAGE = 'NEW_WORKSPACE_MESSAGE';
const SOCKET_SERVER = 'http://localhost:3000';

const Workspace = () => {
  const socketRef = useRef();
  const { workspaceId } = useParams();
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

  // if (workspace && !workspace.channels.length) {
  //   return null;
  // }

  return (
    <Container>
      <Channels
        user={auth.userInfo}
        workspace={workspace}
        channels={workspace.channels}
        directMessages={workspace.directMessages}
      />
      <Header>Header</Header>
      <Messages>
        {/* <MessageList>
          {[{ content: 'moo' }].map((message, idx) => (
            <MessageListItem key={idx}>{message.content}</MessageListItem>
          ))}
        </MessageList> */}
      </Messages>
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
  grid-template-rows: 1fr auto;
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

const Messages = styled.div`
  background-color: #ffffff;
  grid-column: 2;
  grid-row: 2;
  padding: 0 1em;
  overflow-y: scroll;
  color: #fff;
  padding: 1em;
  text-align: center;
`;

const MessageList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const MessageListItem = styled.li`
  padding: 0.2em;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: #f2f2f2;
`;
