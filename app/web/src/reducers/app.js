import { GET_WORKSPACES } from '../constants/types';

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
    default:
      return state;
  }
};

export default appReducer;
