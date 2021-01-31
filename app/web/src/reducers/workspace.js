import {
  GET_WORKSPACE_DATA,
  WORKSPACE_UNLOADED,
  SET_ACTIVE_CHANNEL,
} from '../constants/types';

const initalState = {
  name: null,
  channels: [],
  directMessages: [],
  defaultChannel: null,
  activeChannel: null,
  owner: null,
};

const workspaceReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_WORKSPACE_DATA: {
      return {
        ...state,
        name: action.payload.name,
        channels: action.payload.channels,
        owner: action.payload.owner,
        defaultChannel: action.payload.defaultChannel,
        activeChannel: !state.activeChannel
          ? action.payload.defaultChannel
          : state.activeChannel,
        directMessages: action.payload.directMessages,
      };
    }
    case SET_ACTIVE_CHANNEL: {
      return {
        ...state,
        activeChannel: action.payload,
      };
    }
    case WORKSPACE_UNLOADED:
      return {};
    default:
      return state;
  }
};

export default workspaceReducer;
