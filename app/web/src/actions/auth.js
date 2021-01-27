import { AUTH_SUCCESS, AUTH_ERROR } from '../constants/types';

export const loginUser = ({ email, password }, success) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseBody = await res.json();

      if (!res.ok) {
        throw new Error(responseBody.message);
      }

      localStorage.setItem('token', responseBody.token);
      localStorage.setItem('userInfo', JSON.stringify(responseBody.userInfo));
      localStorage.setItem('expiresAt', responseBody.expiresAt);

      success(true, { user: responseBody.userInfo });
      dispatch(authSuccess(responseBody));
    } catch (err) {
      success(false, { user: null });
      dispatch(authError(err.message));
    }
  };
};

export const registerUser = ({ email, password, username }, success) => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      const responseBody = await res.json();

      if (!res.ok) {
        throw new Error(responseBody.message);
      }

      localStorage.setItem('token', responseBody.token);
      localStorage.setItem('userInfo', JSON.stringify(responseBody.userInfo));
      localStorage.setItem('expiresAt', responseBody.expiresAt);

      dispatch(authSuccess(responseBody));
      success(true, { user: responseBody.userInfo });
    } catch (err) {
      dispatch(authError(err.message));
      success(false, { user: null });
    }
  };
};

export function authSuccess(payload) {
  return {
    type: AUTH_SUCCESS,
    payload,
  };
}

export function authError(payload) {
  return {
    type: AUTH_ERROR,
    payload,
  };
}
