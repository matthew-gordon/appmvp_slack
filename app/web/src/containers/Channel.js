import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NEW_CHANNEL_MESSAGE } from '../constants/types';
import { getChannelData } from '../actions/channel';

const Channel = ({ socket }) => {
  const { channelId } = useParams();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const channel = useSelector((state) => state.channel);

  useEffect(() => {
    try {
      dispatch(getChannelData({ channelId }));
    } catch (err) {
      console.log(err);
    }
  }, [channelId]);

  const handleKeyDown = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      socket.current.emit(NEW_CHANNEL_MESSAGE, {
        channelId: parseInt(channel.id),
        senderId: socket.current.id,
        userId: auth.userInfo.id,
        content: message,
      });
      setMessage('');
    }
  };

  return (
    <>
      <Header>{channel.name}</Header>
      <Messages>
        <MessageList>
          {channel.messages.map((message) => (
            <MessageListItem key={message.messageId}>
              {message.text}
            </MessageListItem>
          ))}
        </MessageList>
      </Messages>
      <InputContainer>
        <Input
          type="text"
          placeholder="message #team"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
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
