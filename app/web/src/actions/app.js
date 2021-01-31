import { GET_WORKSPACES, WORKSPACES_ERROR } from '../constants/types';

export const getWorkspaces = ({ userId }) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3000/users/${userId}/workspaces`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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
    type: WORKSPACES_ERROR,
    payload,
  };
}
