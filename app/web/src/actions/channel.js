import { GET_CHANNEL_MESSAGES } from '../constants/types';

export const getChannelMessages = ({ channelId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/channels/${channelId}/messages`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const responseBody = await res.json();

      dispatch(channelMessagesSuccess(responseBody.messages));
    } catch (err) {
      console.log(err);
    }
  };
};

export function channelMessagesSuccess(payload) {
  return {
    type: GET_CHANNEL_MESSAGES,
    payload,
  };
}
