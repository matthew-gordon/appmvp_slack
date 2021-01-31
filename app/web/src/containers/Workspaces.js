import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const Workspaces = ({ workspaces }) => {
  const { workspaceId } = useParams();

  const isActive = (workspace) => {
    return workspace.id === parseInt(workspaceId);
  };

  return (
    <Container>
      <WorkspaceList>
        {workspaces.length &&
          workspaces.map((workspace) => (
            <WorkspaceLink
              className={`${isActive(workspace) ? 'workspace-active' : ''}`}
              key={workspace.id}
              to={`/workspaces/${workspace.id}/${workspace.defaultChannel.id}`}
            >
              {workspace.name.charAt(0).toUpperCase()}
            </WorkspaceLink>
          ))}
      </WorkspaceList>
    </Container>
  );
};

export default Workspaces;

const Container = styled.div`
  background-color: #362233;
  grid-column: 1;
  grid-row: 1 / 4;
  color: #fff;
  padding: 1em;
  text-align: center;
`;

const WorkspaceList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const WorkspaceLink = styled(Link)`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  cursor: pointer;
  transition: border-width ease-in 0.1s;
  text-decoration: none;

  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }

  &.workspace-active {
    border-style: solid;
    border-width: thick;
    border-color: #fff;
  }
`;
