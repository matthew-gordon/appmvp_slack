import { GET_WORKSPACE_DATA, WORKSPACE_UNLOADED } from '../constants/types';

const initalState = {
  name: null,
  channels: [],
  directMessages: [],
  defaultChannel: null,
  activeChannel: null,
};

const workspaceReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_WORKSPACE_DATA: {
      const defaultChannel = action.payload.channels
        .filter((channel) => channel.default === true)
        .pop();

      return {
        ...state,
        name: action.payload.name,
        channels: action.payload.channels,
        defaultChannel,
        activeChannel: defaultChannel,
        directMessages: action.payload.directMessages,
      };
    }
    case WORKSPACE_UNLOADED:
      return {};
    default:
      return state;
  }
};

export default workspaceReducer;
