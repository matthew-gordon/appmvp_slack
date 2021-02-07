import React, { useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { getWorkspaceUnreadMessageCount } from '../../actions/workspace';
import { CLEAR_COUNT } from '../../constants/types';

const UPDATE_UNREAD_MESSAGE_COUNT = 'UPDATE_UNREAD_MESSAGE_COUNT';
const SOCKET_SERVER = 'http://localhost:3000';

const Workspace = ({ workspace }) => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const socketRef = useRef();

  const unreadMessageCount = useSelector(
    (state) => state.workspace.unreadMessages
  );

  useLayoutEffect(() => {
    dispatch({ type: CLEAR_COUNT });
  }, [workspaceId]);

  useEffect(() => {
    dispatch(getWorkspaceUnreadMessageCount({ workspaceId }));

    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { workspaceId },
    });

    socketRef.current.on(UPDATE_UNREAD_MESSAGE_COUNT, (message) => {
      const workspace = parseInt(workspaceId) === message.workspaceId;

      console.log(`
      
      
      
      UPDATE THE COUNT
      
      
      
      `);
    });

    return () => {
      // dispatch({ type: CLEAR_COUNT });
      socketRef.current.close();
    };
  }, [workspaceId]);

  const isActive = () => {
    return workspace.id === parseInt(workspaceId);
  };

  return (
    <Container>
      <Badge
        className={`${!isActive() && unreadMessageCount > 0 ? 'active' : ''}`}
      >
        {unreadMessageCount}
      </Badge>
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
  transform: scale(0);
  transition: all 0.05s ease-in-out;

  &.active {
    transform: scale(1);
  }
`;
