import React, { useEffect } from 'react';
import styled from 'styled-components';
// import Messages from '../components/Workspace/Messages';
// import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../actions/channel';

const MessagesContainer = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const messages = useSelector(({ channel }) => channel.messages);

  useEffect(() => {
    if (channelId) {
      dispatch(getChannelMessages({ channelId }));
    }
  }, [channelId]);

  return (
    <Container>
      <MessageList>
        {messages && messages.length ? (
          messages.map((message) => (
            <MessageListItem>{message.text}</MessageListItem>
          ))
        ) : (
          <div>No messages yet! Be the first!!</div>
        )}
      </MessageList>
    </Container>
  );
};

export default MessagesContainer;

const Container = styled.div`
  background-color: #ffffff;
  grid-column: 2;
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
