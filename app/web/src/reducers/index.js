import { combineReducers } from 'redux';
import auth from './auth';
import app from './app';
import workspace from './workspace';

export default combineReducers({
  auth,
  app,
  workspace,
});
