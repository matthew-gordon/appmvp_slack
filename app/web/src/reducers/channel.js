import { GET_CHANNEL_DATA, SET_ACTIVE_CHANNEL } from '../constants/types';

const initialState = {
  name: null,
  private: null,
  default: null,
  members: [],
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL_DATA: {
      return {
        ...state,
        name: action.payload.name,
        public: action.payload.public,
        default: action.payload.default,
        members: action.payload.members,
        messages: action.payload.messages,
      };
    }
    default:
      return state;
  }
};
