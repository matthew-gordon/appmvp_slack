import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const Channel = ({ channel }) => {
  const { workspaceId } = useParams();

  return (
    <StyledLink
      className={``}
      key={`channel-${channel.id}`}
      to={`/workspaces/${workspaceId}/${channel.id}`}
    >
      <SideBarListItem># {channel.name}</SideBarListItem>
    </StyledLink>
  );
};

const User = ({ id, username }) => {
  const { workspaceId } = useParams();

  return (
    <StyledLink key={`user-${id}`} to={`/workspaces/${workspaceId}/user/${id}`}>
      <SideBarListItem>
        <Bubble /> {username}
      </SideBarListItem>
    </StyledLink>
  );
};

const Channels = ({ user }) => {
  const location = useLocation();
  const { workspaceId } = useParams();
  const workspace = useSelector((state) => state.workspace);
  // const isOwner = workspace.ownerId === user.id;

  return (
    <ChannelWrapper>
      <div>
        <WorkspaceNameHeader>{workspace.name}</WorkspaceNameHeader>
        {user.username}
      </div>
      <div>
        <SideBarList style={{ textAlign: 'left' }}>
          <SideBarListHeader>
            Channels
            <Link
              to={{
                pathname: `/workspaces/${workspaceId}/channel/new`,
                state: { background: location },
              }}
            >
              <Add className="material-icons">
                <FontAwesomeIcon icon={faPlusCircle} />
              </Add>
            </Link>
          </SideBarListHeader>
          {workspace.channels.map((channel) => (
            <Channel key={channel.id} channel={channel} />
          ))}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Direct Messages
            <Add className="material-icons">
              <FontAwesomeIcon icon={faPlusCircle} />
            </Add>
          </SideBarListHeader>
          <StyledLink to={`/workspaces/${workspaceId}/user/${user.id}`}>
            <SideBarListItem>
              <Bubble /> {user.username} <small>(you)</small>
            </SideBarListItem>
          </StyledLink>
          {workspace.directMessages.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <StyledLink
            to={{
              pathname: `/workspaces/${workspaceId}/member/new`,
              state: { background: location },
            }}
          >
            <SideBarListItem> + invite people</SideBarListItem>
          </StyledLink>
        </SideBarList>
      </div>
    </ChannelWrapper>
  );
};

export default Channels;

const StyledLink = styled(Link)`
  color: #999;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const ChannelWrapper = styled.div`
  background-color: #52364e;
  grid-column: 1;
  grid-row: 1 / 4;
  color: #fff;
  text-align: center;
`;

const WorkspaceNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0px;
  text-align: left;
`;

const SideBarListItem = styled.li`
  padding: 6px;
  cursor: pointer;
  font-weight: 300;
  &:hover {
    background: #3e313c;
  }
`;

const Add = styled.i`
  color: #fff;
  font-size: 1em;
  color: rgba(255, 255, 255, 0.4);
  padding: 10px;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
  }
`;

const SideBarListHeader = styled.li`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const Green = styled.span`
  color: #38978d;
`;
