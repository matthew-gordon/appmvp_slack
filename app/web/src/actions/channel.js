import { GET_CHANNEL_DATA, NEW_CHANNEL_MESSAGE } from '../constants/types';

export const getChannelData = ({ channelId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/channels/${channelId}/data`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const responseBody = await res.json();

      dispatch(channelDataSuccess(responseBody));
    } catch (err) {
      console.log(err);
    }
  };
};

export const newChannelMessage = ({ message }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/channels/${message.channelId}/messages/new`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const responseBody = await res.json();

      dispatch(newChannelMessageSuccess(responseBody.messages));
    } catch (err) {
      console.log(err);
    }
  };
};

export function newChannelMessageSuccess(payload) {
  return {
    type: NEW_CHANNEL_MESSAGE,
    payload,
  };
}

export function channelDataSuccess(payload) {
  return {
    type: GET_CHANNEL_DATA,
    payload,
  };
}
