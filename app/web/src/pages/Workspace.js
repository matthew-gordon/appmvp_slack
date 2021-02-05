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

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { channelId } = useParams();

  return (
    <div>
      <h2>channelIds</h2>
      <h3>{channelId}</h3>
    </div>
  );
}

function Conversation() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { conversationId } = useParams();

  return (
    <div>
      <h2>Conversations</h2>
      <h3>{conversationId}</h3>
    </div>
  );
}

const Workspace = () => {
  const { workspaceId, channelId } = useParams();
  const auth = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);
  const workspace = useSelector((state) => state.workspace);
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();

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
