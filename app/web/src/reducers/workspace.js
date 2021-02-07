import {
  GET_WORKSPACE_DATA,
  WORKSPACE_UNLOADED,
  SET_ACTIVE_CHANNEL,
  GET_WORKSPACE_UNREAD_MESSAGE_COUNT,
} from '../constants/types';

const initalState = {
  name: null,
  channels: [],
  directMessages: [],
  defaultChannel: null,
  activeChannel: null,
  owner: null,
  unreadMessages: 0,
};

const workspaceReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_WORKSPACE_DATA: {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        channels: action.payload.channels,
        owner: action.payload.owner,
        defaultChannel: action.payload.defaultChannel,
        activeChannel: !!state.activeChannel
          ? state.activeChannel
          : action.payload.defaultChannel,
        directMessages: action.payload.directMessages,
      };
    }
    case SET_ACTIVE_CHANNEL: {
      return {
        ...state,
        activeChannel: action.payload,
      };
    }
    case GET_WORKSPACE_UNREAD_MESSAGE_COUNT:
      console.log(action);
      return {
        ...state,
        unreadMessages: action.payload,
      };
    case WORKSPACE_UNLOADED:
      return {};
    default:
      return state;
  }
};

export default workspaceReducer;
