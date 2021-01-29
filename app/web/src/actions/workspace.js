import { GET_WORKSPACE_DATA, WORKSPACES_ERROR } from '../constants/types';

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

      console.log(responseBody);

      dispatch(workspaceDataSuccess(responseBody));
    } catch (err) {
      dispatch(workspacesFailure(err.message));
    }
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
