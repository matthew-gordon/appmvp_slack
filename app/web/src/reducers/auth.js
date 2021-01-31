import { AUTH_SUCCESS, AUTH_ERROR } from '../constants/types';

const token = localStorage.getItem('token');
const expiresAt = localStorage.getItem('expiresAt');
const userInfo = localStorage.getItem('userInfo');

const isAuthenticated = () => {
  if (!token || !expiresAt) {
    return false;
  }
  return new Date().getTime() / 1000 < expiresAt;
};

const initialState = {
  token,
  expiresAt,
  userInfo: userInfo ? JSON.parse(userInfo) : {},
  workspaces: [],
  isLoggedIn: isAuthenticated(),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        userInfo: action.payload.userInfo,
        workspaces: action.payload.workspaces,
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
