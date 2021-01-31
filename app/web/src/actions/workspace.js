import {
  GET_WORKSPACE_DATA,
  WORKSPACES_ERROR,
  SET_ACTIVE_CHANNEL,
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
