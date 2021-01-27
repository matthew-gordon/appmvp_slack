import { GET_WORKSPACES, WORKSPACES_UNLOADED } from '../constants/types';

const initalState = {
  workspaces: [],
};

const appReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_WORKSPACES:
      return {
        ...state,
        workspaces: action.payload,
      };
    case WORKSPACES_UNLOADED:
      return {};
    default:
      return state;
  }
};

export default appReducer;
