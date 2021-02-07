import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { NEW_DIRECT_MESSAGE } from '../constants/types';
import {
  getDirectMessageData,
  newDirectMessage,
} from '../actions/directMessage';

const SOCKET_SERVER = 'http://localhost:3000';

const Conversation = () => {
  const { workspaceId, recipientId } = useParams();
  const socketRef = useRef();
  const messagesEndRef = useRef();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const directMessage = useSelector((state) => state.directMessage);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [directMessage.messages]);

  useEffect(() => {
    try {
      dispatch(getDirectMessageData({ workspaceId, recipientId }));

      socketRef.current = socketIOClient(SOCKET_SERVER, {
        query: { workspaceId },
      });

      socketRef.current.on(NEW_DIRECT_MESSAGE, (message) => {
        const workspace = parseInt(workspaceId) === message.workspaceId;
        const isSender = message.userId === auth.userInfo.id;
        const isRecipient = message.recipientId === auth.userInfo.id;

        if (workspace && (isSender || isRecipient)) {
          dispatch(newDirectMessage({ message }));
        }
      });

      return () => {
        socketRef.current.close();
      };
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, workspaceId, recipientId]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (directMessage && !directMessage.user) {
    return null;
  }

  return (
    <>
      <Header>{directMessage.user.username}</Header>
      <Messages>
        <MessageList>
          {directMessage.messages.map((message) => (
            <MessageListItem key={message.id}>{message.text}</MessageListItem>
          ))}
          <div ref={messagesEndRef} />
        </MessageList>
      </Messages>
      <InputContainer>
        <Input
          type="text"
          placeholder={`message #${directMessage.user.username}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              socketRef.current.emit(NEW_DIRECT_MESSAGE, {
                workspaceId: parseInt(workspaceId),
                recipientId: parseInt(recipientId),
                senderId: socketRef.current.id,
                userId: auth.userInfo.id,
                content: message,
              });
              setMessage('');
            }
          }}
        />
      </InputContainer>
    </>
  );
};

export default Conversation;

const Messages = styled.div`
  background-color: #ffffff;
  grid-column: 3;
  grid-row: 2;
  padding: 0 1em;
  overflow-y: scroll;
  color: #000;
  padding: 1em;
  text-align: center;
`;

const MessageList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
`;

const MessageListItem = styled.li`
  padding: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  background-color: #f2f2f2;
`;

const Header = styled.div`
  background-color: #ffffff;
  grid-column: 3;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  padding: 1em;
  text-align: center;
`;

const InputContainer = styled.div`
  background-color: #fff;
  grid-column: 3;
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
