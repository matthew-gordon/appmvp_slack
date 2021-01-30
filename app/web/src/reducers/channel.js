import { GET_CHANNEL_MESSAGES } from '../constants/types';

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};
