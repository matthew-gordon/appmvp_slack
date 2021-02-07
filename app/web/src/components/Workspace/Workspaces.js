import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Workspace from './Workspace';

const Workspaces = ({ workspaces }) => {
  return (
    <Container>
      <WorkspaceList>
        {workspaces.length &&
          workspaces.map((workspace) => (
            <Workspace
              key={`workspace-${workspace.id}`}
              workspace={workspace}
            />
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
  align-items: center;
  justify-content: space-around;
`;
