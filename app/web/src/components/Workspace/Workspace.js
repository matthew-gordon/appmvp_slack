import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkspaceUnreadMessageCount } from '../../actions/workspace';

const Workspace = ({ workspace }) => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const unreadMessageCount = useSelector(
    (state) => state.workspace.unreadMessages
  );

  console.log(unreadMessageCount);

  useEffect(() => {
    dispatch(getWorkspaceUnreadMessageCount({ workspaceId }));
  }, [workspaceId]);

  const isActive = () => {
    return workspace.id === parseInt(workspaceId);
  };

  return (
    <Container>
      {!isActive() && unreadMessageCount > 0 && (
        <Badge>{unreadMessageCount}</Badge>
      )}
      <WorkspaceLink
        key={`workspace-${workspace.id}`}
        isActive={isActive}
        activeClassName="active"
        to={`/workspaces/${workspace.id}/channel/${workspace.defaultChannel.id}`}
      >
        {workspace.name.charAt(0).toUpperCase()}
      </WorkspaceLink>
    </Container>
  );
};

export default Workspace;

const Container = styled.div`
  position: relative;
  margin: 0px 15px;
  padding: 0px 15px;
`;

const WorkspaceLink = styled(NavLink)`
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

  &.active {
    border-style: solid;
    border-width: thick;
    border-color: #fff;
  }
`;

const Badge = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  height: 25px;
  width: 25px;
  right: 5px;
  top: -5px;
  background: red;
  text-align: center;
  border-radius: 100%;
  border: solid 4px #362234;
  color: #fff;
  font-size: 0.75em;
  font-weight: 700;
`;
