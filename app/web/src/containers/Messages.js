import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Messages from '../components/Workspace/Messages';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../actions/channel';

const MessagesContainer = () => {
  const dispatch = useDispatch();
  const channel = useSelector(({ channel }) => channel);
  const { channelId } = useParams();

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <Messages>
      {data.getAllMessages.messages &&
        data.getAllMessages.messages.map((message) => {
          return (
            <Message key={`message-${message.id}`}>
              <MessageAuthor>
                <strong>{message.author.username}</strong>{' '}
                <small>{moment(message.createdAt).format('h:mm a')}</small>
              </MessageAuthor>
              <MessageText>{message.text}</MessageText>
            </Message>
          );
        })}
    </Messages>
  );
};

export default MessagesContainer;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`;

const MessageAuthor = styled.div`
  /* font-weight: 700; */
`;

const MessageText = styled.div``;
