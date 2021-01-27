import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkspaces } from '../actions/app';
import { WORKSPACES_UNLOADED } from '../constants/types';

const WorkspacesPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);
  const app = useSelector(({ app }) => app);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getWorkspaces({ id: userId }));

    return () => {
      dispatch({ type: WORKSPACES_UNLOADED });
    };
  }, [dispatch, userId]);

  return (
    <Container>
      <Header>
        <h2>Slack</h2>
      </Header>
      <Main>
        <Card>
          <Subtitle>Workspaces for {auth.userInfo.email}</Subtitle>
          {app.workspaces.map((workspace) => (
            <div key={`workspace-${workspace.id}`}>
              <Link
                to={`/client/${auth.userInfo.id}/workspaces/${workspace.id}`}
              >
                <WorkspaceListItem>{workspace.name}</WorkspaceListItem>
                <Hr />
              </Link>
            </div>
          ))}
        </Card>
      </Main>
      <Footer>
        <Links>
          <li>Privacy &amp; Terms</li>
          <li>Contact Us</li>
          <li>Region</li>
        </Links>
      </Footer>
    </Container>
  );
};

export default WorkspacesPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  clear: both;
  margin-bottom: 16px;
`;

const Main = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 960px;
`;

const Card = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.div`
  text-align: left;
  padding: 1em;
  margin-bottom: 15px;
  border-bottom: solid 1px
    rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);
`;

const WorkspaceListItem = styled.div`
  text-align: left;
  color: inherit;
  display: block;
  padding: 15px 0 20px 24px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 100%;
`;

const Links = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  max-width: 500px;
  list-style: none;
  margin: 0;
  padding: 0;
`;
