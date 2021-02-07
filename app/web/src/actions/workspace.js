import {
  GET_WORKSPACE_DATA,
  WORKSPACES_ERROR,
  SET_ACTIVE_CHANNEL,
  GET_WORKSPACE_UNREAD_MESSAGE_COUNT,
} from '../constants/types';

export const getWorkspaceData = ({ workspaceId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/data`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const responseBody = await res.json();

      dispatch(workspaceDataSuccess(responseBody));
    } catch (err) {
      dispatch(workspacesFailure(err.message));
    }
  };
};

export const getWorkspaceUnreadMessageCount = ({ workspaceId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/workspaces/${workspaceId}/unread-messages`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const responseBody = await res.json();

      dispatch({
        type: GET_WORKSPACE_UNREAD_MESSAGE_COUNT,
        payload: responseBody.count,
      });
    } catch (err) {
      dispatch(workspacesFailure(err.message));
    }
  };
};

export const setActiveChannel = (payload) => {
  return {
    type: SET_ACTIVE_CHANNEL,
    payload,
  };
};

export function workspaceDataSuccess(payload) {
  return {
    type: GET_WORKSPACE_DATA,
    payload,
  };
}

export function workspacesFailure(payload) {
  return {
    type: WORKSPACES_ERROR,
    payload,
  };
}
