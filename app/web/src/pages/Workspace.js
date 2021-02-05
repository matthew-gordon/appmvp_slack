import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkspaceData } from '../actions/workspace';
import { getWorkspaces } from '../actions/app';
import Channels from '../containers/Channels';
import Workspaces from '../containers/Workspaces';
import Channel from '../containers/Channel';
import Conversation from '../containers/Conversation';

const Workspace = () => {
  const { workspaceId, channelId } = useParams();
  let { path } = useRouteMatch();
  const auth = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);
  const workspace = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaceData({ workspaceId }));
  }, [dispatch, workspaceId, channelId]);

  useEffect(() => {
    dispatch(getWorkspaces({ userId: auth.userInfo.id }));
  }, [dispatch, auth.userInfo.id]);

  if (workspace && !workspace.channels.length) {
    return null;
  }

  return (
    <Container>
      <Workspaces workspaces={app.workspaces} />
      <Channels channels={workspace.channels} user={auth.userInfo} />
      <Switch>
        <Route path={`${path}/channel/:channelId`}>
          <Channel />
        </Route>
        <Route path={`${path}/conversation/:conversationId`}>
          <Conversation />
        </Route>
      </Switch>
    </Container>
  );
};

export default Workspace;

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;
