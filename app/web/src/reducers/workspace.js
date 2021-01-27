import { GET_WORKSPACE_DATA, WORKSPACE_UNLOADED } from '../constants/types';

const initalState = {
  name: null,
  channels: [],
  directMessages: [],
};

const workspaceReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_WORKSPACE_DATA:
      return {
        ...state,
        channels: action.payload.channels,
        directMessages: action.payload.directMessages,
      };
    case WORKSPACE_UNLOADED:
      return {};
    default:
      return state;
  }
};

export default workspaceReducer;
