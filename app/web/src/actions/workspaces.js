import { GET_WORKSPACES, GET_WORKSPACES_ERROR } from '../constants/types';

export const getWorkspaces = ({ id }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3000/client/${id}/workspaces`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await res.json();

      dispatch(workspacesSuccess(responseBody.workspaces));
    } catch (err) {
      dispatch(workspacesFailure(err.message));
    }
  };
};

export function workspacesSuccess(payload) {
  return {
    type: GET_WORKSPACES,
    payload,
  };
}

export function workspacesFailure(payload) {
  return {
    type: GET_WORKSPACES_ERROR,
    payload,
  };
}
