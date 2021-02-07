import {
  GET_DIRECT_MESSAGE_DATA,
  NEW_DIRECT_MESSAGE,
} from '../constants/types';

export const getDirectMessageData = ({ workspaceId, recipientId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/direct-messages/${recipientId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const responseBody = await res.json();

      console.log(responseBody);

      dispatch({
        type: GET_DIRECT_MESSAGE_DATA,
        payload: responseBody,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const newDirectMessage = ({ message }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/direct-messages/${message.recipientId}/new`,
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

      dispatch({
        type: NEW_DIRECT_MESSAGE,
        payload: responseBody.message,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
