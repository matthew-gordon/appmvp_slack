import { combineReducers } from 'redux';
import auth from './auth';
import app from './app';
import workspace from './workspace';
import channel from './channel';

export default combineReducers({
  auth,
  app,
  workspace,
  channel,
});
