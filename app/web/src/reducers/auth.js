import { AUTH_SUCCESS, AUTH_ERROR } from '../constants/types';

const token = localStorage.getItem('token');
const expiresAt = localStorage.getItem('expiresAt');
const userInfo = localStorage.getItem('userInfo');

const initialState = {
  token,
  expiresAt,
  userInfo: userInfo ? JSON.parse(userInfo) : {},
  isLoggedIn: !!localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        userInfo: action.payload.userInfo,
        isLoggedIn: true,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
