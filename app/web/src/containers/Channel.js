import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { NEW_CHANNEL_MESSAGE } from '../constants/types';
import { getChannelData } from '../actions/channel';
import { newChannelMessage } from '../actions/channel';

const SOCKET_SERVER = 'http://localhost:3000';

const Channel = () => {
  const socketRef = useRef();
  const messagesEndRef = useRef();
  const messagesContainerRef = useRef();
  const { workspaceId, channelId } = useParams();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const channel = useSelector((state) => state.channel);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [channel.messages]);

  useEffect(() => {
    try {
      dispatch(getChannelData({ channelId }));

      socketRef.current = socketIOClient(SOCKET_SERVER, {
        query: { workspaceId, userId: auth.userInfo.id },
      });

      socketRef.current.on(NEW_CHANNEL_MESSAGE, (message) => {
        if (parseInt(channelId) === message.channelId) {
          dispatch(newChannelMessage({ message }));
        }
      });

      return () => {
        socketRef.current.close();
      };
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, workspaceId, channelId]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header>{channel.name}</Header>
      <Messages>
        <MessageList ref={messagesContainerRef}>
          {channel.messages.map((message) => (
            <MessageListItem key={message.messageId}>
              {message.text}
            </MessageListItem>
          ))}
          <div ref={messagesEndRef} />
        </MessageList>
      </Messages>
      <InputContainer>
        <Input
          type="text"
          placeholder={`message #${channel.name}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              socketRef.current.emit(NEW_CHANNEL_MESSAGE, {
                workspaceId,
                channelId: parseInt(channelId),
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

export default Channel;

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
